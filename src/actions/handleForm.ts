'use server'

import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { ProductModel } from '@/db/models/product.model.ts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
import fs from 'fs'
// Импортируем типы для InferAttributes, InferCreationAttributes, CreationOptional
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

class ValidationError extends Error {}

const saveFile = async (file: File): Promise<string> => {
    const buffer = Buffer.from(await file.arrayBuffer())
    const uniqueFilename = uuidv4()
    const fileExtension = '.' + file.name.split('.').pop()
    const uniqueFullFilename = uniqueFilename + fileExtension
    console.log('uniqueFilename with fileExtension', uniqueFullFilename)
    const outputImagePath = `public/img/${uniqueFullFilename}`

    //fixme `.then(buffer => buffer)` после `.toBuffer()` избыточно, `.toBuffer()` уже возвращает Promise с буфером. Если `sharp` выдаст ошибку, `resizedBuffer` будет `undefined` из-за `.catch()`, что корректно обрабатывается.
    const resizedBuffer = await sharp(buffer)
        .resize(1356, 668)
        .toBuffer()
        .then(buffer => buffer)
        .catch(err => console.error(err))

    if (!resizedBuffer) {
        throw new ValidationError('File format not supported')
    }

    // Сохранение обработанного буфера в файл
    await new Promise<void>((resolve, reject) => {
        fs.writeFile(outputImagePath, resizedBuffer, (err) => {
            if (err) {
                console.error('Error saving the image:', err)
                reject(err)
            }
            console.log('Image saved successfully:', outputImagePath)
            resolve()
        })
    })
    return uniqueFullFilename
}

// Новый тип для очищенных данных формы, соответствующий ProductModel
type ProductFormData = {
    id: number | undefined;
    name: string;
    articul: string;
    sku: string;
    descriptionShort: string;
    descriptionLong: string;

    isNew: boolean;
    isActive: boolean;

    brandId: number;
    collectionId: number;
    countryId: number;
    styleId: number;
}

const cleanFormData = (formData: FormData): ProductFormData => {
    const id = formData.get('id')
    const name = formData.get('name')
    const articul = formData.get('articul')
    const sku = formData.get('sku')
    const descriptionShort = formData.get('descriptionShort')
    const descriptionLong = formData.get('descriptionLong')
    const isNew = formData.get('isNew') // Чекбокс будет 'on' или null/undefined
    const isActive = formData.get('isActive') // Чекбокс будет 'on' или null/undefined
    const brandId = formData.get('brandId')
    const collectionId = formData.get('collectionId')
    const countryId = formData.get('countryId')
    const styleId = formData.get('styleId')

    console.log('--- FormData contents ---');
    console.log('id:', id, typeof id);
    console.log('name:', name, typeof name);
    console.log('articul:', articul, typeof articul);
    console.log('sku:', sku, typeof sku);
    console.log('descriptionShort:', descriptionShort, typeof descriptionShort);
    console.log('descriptionLong:', descriptionLong, typeof descriptionLong);
    console.log('isNew:', isNew, typeof isNew);
    console.log('isActive:', isActive, typeof isActive);
    console.log('brandId:', brandId, typeof brandId);
    console.log('collectionId:', collectionId, typeof collectionId);
    console.log('countryId:', countryId, typeof countryId);
    console.log('styleId:', styleId, typeof styleId);
    console.log('-------------------------');

    // Проверяем типы полученных данных
    if (
        typeof name !== 'string' ||
        typeof articul !== 'string' ||
        typeof sku !== 'string' ||
        typeof descriptionShort !== 'string' ||
        typeof descriptionLong !== 'string'
    ) {
        throw new ValidationError('Invalid data type for text fields')
    }

    // FormData.get() для <select> всегда возвращает строку, даже если это число
    const parsedBrandId = Number(brandId)
    const parsedCollectionId = Number(collectionId)
    const parsedCountryId = Number(countryId)
    const parsedStyleId = Number(styleId)

    if (isNaN(parsedBrandId) || isNaN(parsedCollectionId) || isNaN(parsedCountryId) || isNaN(parsedStyleId)) {
        throw new ValidationError('Invalid data type for ID fields');
    }
    if (parsedBrandId <= 0 || parsedCollectionId <= 0 || parsedCountryId <= 0 || parsedStyleId <= 0) {
        throw new ValidationError('ID fields cannot be zero or negative');
    }

    // Проверяем обязательные поля (например, name)
    if (!name || name.trim().length === 0) { // Проверка на пустую строку после обрезки пробелов
        throw new ValidationError('Product name cannot be empty')
    }
    if (name.length < TITLE_MIN_LENGTH) { // Используем TITLE_MIN_LENGTH для name
        throw new ValidationError('Product name too short')
    }

    // Преобразуем чекбоксы в булевы значения
    const parsedIsNew = isNew === 'on'
    const parsedIsActive = isActive === 'on'

    return {
        id: id ? Number(id) : undefined,
        name,
        articul,
        sku,
        descriptionShort,
        descriptionLong,
        isNew: parsedIsNew,
        isActive: parsedIsActive,
        brandId: parsedBrandId,
        collectionId: parsedCollectionId,
        countryId: parsedCountryId,
        styleId: parsedStyleId,
    }
}

const cleanFormFile = (formData: FormData): File | undefined => {
    const file = formData.get('product_picture')
    if (file == null) {
        return undefined
    }
    if (!(file instanceof File)) { // Проверяем, что это действительно File, а не string
        throw new ValidationError('Unexpected file type for product_picture')
    }

    if (file.size === 0) {
        return undefined
    }
    if (file.size > FILE_LIMIT) {
        throw new ValidationError(`File is bigger than limit: "${FILE_LIMIT}"`)
    }
    return file
}

export const handleForm = async (formData: FormData) => {
    try {
        // Очищаем и получаем данные формы
        const productData = cleanFormData(formData)

        // Получаем файл
        const formFile = cleanFormFile(formData)

        //ВНИМАНИЕ: нужно сохранить форматирование (жирный, курсив и т.д.) в descriptionLong, то удалять все HTML-теги не стоит. В таком случае ReactQuill поступает правильно, оборачивая в <p>. Если ты хочешь сохранить HTML, просто не делай replace(/<[^>]+>/g, '').

        let preview: string | undefined
        // Для 'descriptionShort' или 'descriptionLong' можно сделать превью
        if (productData.descriptionShort) {
            preview = productData.descriptionShort.replace(/<[^>]+>/g, '').slice(0, 100)
        } else if (productData.descriptionLong) {
            preview = productData.descriptionLong.replace(/<[^>]+>/g, '').slice(0, 100)
        }

        // Подключаем ProductModel
        // Создаем объект для upsert
        const upsertData: InferCreationAttributes<ProductModel> = {
            brandId: productData.brandId,
            collectionId: productData.collectionId,
            countryId: productData.countryId,
            styleId: productData.styleId,

            id: productData.id,
            name: productData.name,
            articul: productData.articul,
            sku: productData.sku,

            descriptionShort: productData.descriptionShort,
            descriptionLong: productData.descriptionLong,

            isNew: productData.isNew,
            isActive: productData.isActive,
            // Добавляем preview, если оно требуется в ProductModel
            // Если в ProductModel нет поля 'preview', это поле нужно будет удалить или добавить в модель
            preview: preview // Предполагаем, что ProductModel может иметь поле 'preview'

            // Если есть обязательные поля без значений (например, categoryId, styleId и т.д.)
            // и они не приходят из формы, вам нужно будет либо:
            // 1. Добавить их в форму
            // 2. Установить значения по умолчанию здесь
            // 3. Убедиться, что они могут быть nullable в вашей модели, или что Sequelize их автогенерирует
            // Пример (если бы styleId был необязательным или имел дефолтное значение 1):
            // styleId: productData.styleId || 1, // Пример, если бы styleId приходил из формы
            // brandId: productData.brandId || 1, // Пример
            // collectionId: productData.collectionId || 1, // Пример
            // countryId: productData.countryId || 1, // Пример
        }

        // Используем ProductModel [created] (раньше назывался isNew или isUpdated в старых версиях): Это булево значение (true или false), которое указывает, была ли запись создана (true) или обновлена (false).
        const [ product, created ] = await ProductModel.upsert(upsertData)

        if (created) {
            console.log(`Product with ID ${product.id} was created.`)
        } else {
            console.log(`Product with ID ${product.id} was updated.`)
        }

        //todo разобраться с хранением ссылок на картинки в БД и раскомментировать
        // if (formFile) {
        //     const fileName = await saveFile(formFile)
        //     await ProductModel.update({ path: `/img/${fileName}` }, { where: { id: product.id } })
        // }

        revalidatePath('/product')
        redirect(`/product/${product.id}`) // Перенаправляем на страницу нового продукта
    } catch (err: any) {
        console.error('Error on handleForm:  ', err)
        // Проверяем, является ли ошибка перенаправлением по ее 'digest' свойству. Это самый надежный способ для Server Actions
        if (err && typeof err === 'object' && 'digest' in err && typeof err.digest === 'string' && err.digest.startsWith('NEXT_REDIRECT')) {
            throw err // Перебрасываем ошибку перенаправления дальше
        }

        // Для всех остальных ошибок
        if (err instanceof ValidationError) {
            redirect(`/api/error/?code=400&message=VALIDATION_ERROR&details=${encodeURIComponent(err.message)}`);
        }
        // Для остальных серверных ошибок
        redirect(`/api/error/?code=500&message=SERVER_ERROR_on_handleForm&details=${encodeURIComponent(String(err))}`);
    }
}
