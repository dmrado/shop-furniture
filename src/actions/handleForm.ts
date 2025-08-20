'use server'

import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { ProductModel } from '@/db/models/product.model.ts'
import { revalidatePath } from 'next/cache'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
import fs from 'fs/promises'
import slugify from 'slugify'
import path from 'path'
// Импортируем типы для InferAttributes, InferCreationAttributes, CreationOptional
import {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize'
import { ProductVariantModel } from '@/db/models'

class ValidationError extends Error {
}

const saveFile = async (file: File, productName: string): Promise<string> => {
    const buffer = Buffer.from(await file.arrayBuffer())

    // 1. Создаём "slug" из имени продукта с транслитерацией Пример: "Диван-кровать Венеция" -> "divan-krovat-venetsiia"
    const slug = slugify(productName, {
        lower: true, // перевести в нижний регистр
        strict: true, // удалить специальные символы
        locale: 'ru' // включить правила транслитерации для русского
    })
    // 2. Добавляем короткий уникальный идентификатор (первая часть UUID)
    //todo добавить проверку на наличие такого имени и добавлять только если уже есть
    const uniqueId = uuidv4().split('-')[0]

    // 3. Получаем расширение файла
    const fileExtension = path.extname(file.name)

    // 4. Формируем финальное имя файла
    const uniqueFullFilename = `${slug}-${uniqueId}${fileExtension}`

    const uploadDir = path.join(process.cwd(), 'public', 'img')
    const outputImagePath = path.join(uploadDir, uniqueFullFilename)

    await fs.mkdir(uploadDir, { recursive: true })

    //
    // const uniqueFilename = uuidv4()
    // const fileExtension = '.' + file.name.split('.').pop()
    // const uniqueFullFilename = uniqueFilename + fileExtension
    // console.log('uniqueFilename with fileExtension', uniqueFullFilename)
    // const outputImagePath = `public/img/${uniqueFullFilename}`

    //fixme `.then(buffer => buffer)` после `.toBuffer()` избыточно, `.toBuffer()` уже возвращает Promise с буфером. Если `sharp` выдаст ошибку, `resizedBuffer` будет `undefined` из-за `.catch()`, что корректно обрабатывается.
    const resizedBuffer = await sharp(buffer)
        .resize(1920, 1080)
        .toFormat('jpeg') // Конвертируем в JPEG
        .toBuffer()
        // .then((buffer) => buffer)
        .catch((err) => {
            console.error(err)
            return undefined
        })

    if (!resizedBuffer) {
        throw new ValidationError('Формат файла не поддерживается или обработка изображения не удалась.')
    }

    // Сохранение обработанного буфера в файл
    // await new Promise<void>((resolve, reject) => {
    //     fs.writeFile(outputImagePath, resizedBuffer, (err) => {
    //         if (err) {
    //             console.error('Error saving the image:', err)
    //             reject(err)
    //         }
    //         console.log('Image saved successfully:', outputImagePath)
    //         resolve()
    //     })
    // })

    await fs.writeFile(outputImagePath, resizedBuffer)
    console.log('Изображение успешно сохранено:', outputImagePath)

    return uniqueFullFilename
}

// Новый тип для очищенных данных формы, соответствующий ProductModel
type ProductFormData = {
    id: number | undefined
    name: string
    articul: string
    sku: string
    descriptionShort: string
    descriptionLong: string

    isNew: boolean
    isActive: boolean

    brandId: number
    collectionId: number
    countryId: number
    styleId: number
    categoryId: number
}

const cleanFormData = (formData: FormData): ProductFormData => {
    const id = (formData.get('id') as string).trim()
    const name = (formData.get('name') as string).trim()
    const articul = (formData.get('articul') as string).trim()
    const sku = (formData.get('sku') as string).trim()
    const descriptionShort = (formData.get('descriptionShort') as string).trim()
    const descriptionLong = (formData.get('descriptionLong') as string).trim()
    const isNew = formData.get('isNew') // Чекбокс будет 'on' или null/undefined
    const isActive = formData.get('isActive') // Чекбокс будет 'on' или null/undefined
    const brandId = formData.get('brandId')
    const collectionId = formData.get('collectionId')
    const countryId = formData.get('countryId')
    const styleId = formData.get('styleId')
    const categoryId = formData.get('categoryId')

    console.log('--- FormData contents ---')
    console.log('id:', id, typeof id)
    console.log('name:', name, typeof name)
    console.log('articul:', articul, typeof articul)
    console.log('sku:', sku, typeof sku)
    console.log('descriptionShort:', descriptionShort, typeof descriptionShort)
    console.log('descriptionLong:', descriptionLong, typeof descriptionLong)
    console.log('isNew:', isNew, typeof isNew)
    console.log('isActive:', isActive, typeof isActive)
    console.log('brandId:', brandId, typeof brandId)
    console.log('collectionId:', collectionId, typeof collectionId)
    console.log('countryId:', countryId, typeof countryId)
    console.log('styleId:', styleId, typeof styleId)
    console.log('categoryId:', categoryId, typeof categoryId)
    console.log('-------------------------')

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
    // ИСПРАВЛЕНИЕ: Превращаем пустые строки в null для числовых ID
    const parsedBrandId = brandId ? Number(brandId) : null
    const parsedCollectionId = collectionId ? Number(collectionId) : null
    const parsedCountryId = countryId ? Number(countryId) : null
    const parsedStyleId = styleId ? Number(styleId) : null
    const parsedCategoryId = categoryId ? Number(categoryId) : null // Парсим categoryId

    //fixme требуется что бы brandId collectionId countryId styleId мог быть null в БД иначе см ниже
    //более мягкая проверка (старая ниже) иначе падает сохранение продукта если каждый раз не выбирать все поля форме, так как форма незримо отправляет пустую строку соответствующую "все бренды"
    if (parsedBrandId !== null && parsedBrandId <= 0) {
        throw new ValidationError('ID бренда не может быть нулем или отрицательным')
    }
    if (parsedCollectionId !== null && parsedCollectionId <= 0) {
        throw new ValidationError('ID коллекции не может быть нулем или отрицательным')
    }
    if (parsedCountryId !== null && parsedCountryId <= 0) {
        throw new ValidationError('ID страны не может быть нулем или отрицательным')
    }
    if (parsedStyleId !== null && parsedStyleId <= 0) {
        throw new ValidationError('ID стиля не может быть нулем или отрицательным')
    }
    if (parsedCategoryId === null || parsedCategoryId <= 0) {
        throw new ValidationError('ID категории не может быть пустым или отрицательным.')
    }

    // if (
    //     isNaN(parsedBrandId) ||
    //     isNaN(parsedCollectionId) ||
    //     isNaN(parsedCountryId) ||
    //     isNaN(parsedStyleId)
    // ) {
    //     throw new ValidationError('Invalid data type for ID fields')
    // }
    // if (
    //     parsedBrandId <= 0 ||
    //     parsedCollectionId <= 0 ||
    //     parsedCountryId <= 0 ||
    //     parsedStyleId <= 0
    // ) {
    //     throw new ValidationError('ID fields cannot be zero or negative')
    // }

    // Проверяем обязательные поля (например, name)
    if (!name || name.trim().length === 0) {
        // Проверка на пустую строку после обрезки пробелов
        throw new ValidationError('Product name cannot be empty')
    }
    if (name.length < TITLE_MIN_LENGTH) {
        // Используем TITLE_MIN_LENGTH для name
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
        categoryId: parsedCategoryId
    }
}

const cleanFormFile = (formData: FormData): File | undefined => {
    const file = formData.get('product_picture')
    if (file == null) {
        return undefined
    }
    if (!(file instanceof File)) {
        // Проверяем, что это действительно File, а не string
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
        // todo: 1. Никаких файлов мы тут не получаем, мы получаем только их айдишники
        // поэтому нам надо - в модели файла переназначить поле productId на айдишник, который нам тут приходит
        const productData = cleanFormData(formData)
        const formFile = cleanFormFile(formData)

        // Получаем и сохраняем файл
        //todo в какую модель добавить поле path для изображения
        // const formFile = cleanFormFile(formData)
        // if (formFile) {
        //     await saveFile(formFile)
        // }

        //ВНИМАНИЕ: нужно сохранить форматирование (жирный, курсив и т.д.) в descriptionLong, то удалять все HTML-теги не стоит. В таком случае ReactQuill поступает правильно, оборачивая в <p>. Если ты хочешь сохранить HTML, просто не делай replace(/<[^>]+>/g, '').

        let preview: string | undefined
        // Для 'descriptionShort' или 'descriptionLong' можно сделать превью
        if (productData.descriptionShort) {
            preview = productData.descriptionShort
                .replace(/<[^>]+>/g, '')
                .slice(0, 100)
        } else if (productData.descriptionLong) {
            preview = productData.descriptionLong
                .replace(/<[^>]+>/g, '')
                .slice(0, 100)
        }

        const productDataToSave = {
            brandId: productData.brandId,
            collectionId: productData.collectionId,
            countryId: productData.countryId,
            styleId: productData.styleId,
            name: productData.name,
            articul: productData.articul,
            sku: productData.sku,
            descriptionShort: productData.descriptionShort,
            descriptionLong: productData.descriptionLong,
            isNew: productData.isNew,
            isActive: productData.isActive,
            preview: productData.descriptionShort || productData.descriptionLong
        }
        let product

        if (productData.id) {
            // Логика изменения
            const existingProduct = await ProductModel.findByPk(productData.id)
            if (!existingProduct) {
                throw new Error(`Продукт с ID ${productData.id} не найден.`)
            }

            // Проверяем, что новый артикул не используется другим продуктом
            const articulExists = await ProductModel.findOne({
                where: { articul: productData.articul }
            })
            if (articulExists && articulExists.id !== productData.id) {
                throw new Error(`Артикул ${productData.articul} уже используется другим продуктом.`)
            }

            // Обновляем данные
            await ProductModel.update(productDataToSave, {
                where: { id: productData.id }
            })

            // Находим обновлённый продукт, чтобы работать с ассоциациями
            product = await ProductModel.findByPk(productData.id)
            if (!product) {
                throw new Error('Не удалось найти обновленный продукт для работы с категориями.')
            }
            console.log(`Продукт с ID ${product.id} был обновлен.`)
        } else {
            // Логика создания
            const existingArticul = await ProductModel.findOne({
                where: { articul: productData.articul }
            })
            if (existingArticul) {
                throw new Error(`Продукт с артикулом ${productData.articul} уже существует.`)
            }

            product = await ProductModel.create(productDataToSave)
            console.log(`Продукт с ID ${product.id} был создан.`)
        }

        // Работаем с категориями, так как "product" теперь всегда полноценный экземпляр
        if (productData.categoryId) {
            console.log(`Попытка привязать категорию с ID: ${productData.categoryId} к продукту ID: ${product.id}`)
            await product.setCategories([ productData.categoryId ])
            console.log('Категория успешно привязана.')
        }

        if (product) {
            console.log(`Product with ID ${product.id} was created.`)
        } else {
            console.log(`Product with ID ${product.id} was updated.`)
        }

        if (formFile) {
            // Теперь передаём имя продукта в saveFile
            const fileName = await saveFile(formFile, productData.name)
            // Обновляем запись в БД, добавляя путь к изображению
            await ProductModel.update({ path: `/img/${fileName}` }, { where: { id: product.id } })
        }

        //todo разобраться с хранением ссылок на картинки в БД и раскомментировать
        // if (formFile) {
        //     const fileName = await saveFile(formFile)
        //     await ProductModel.update({ path: `/img/${fileName}` }, { where: { id: product.id } })
        // }

        revalidatePath('/admin/products')
        return { success: true, product: product.toJSON() }
    } catch (err: any) {
        console.error('Error on handleForm:  ', err)
        // Если это ошибка валидации, выбрасываем ее как ValidationError
        if (err instanceof ValidationError) {
            // Чтобы клиент мог поймать ее как ошибку с сообщением
            throw err
        }
        // Для всех остальных ошибок, выбрасываем общую Error
        throw new Error(`Server error: ${err.message || String(err)}`)
    }
}
