'use server'

import { revalidatePath } from 'next/cache'
import { ProductVariantModel } from '@/db/models/product_variant.model'
import { ProductModel } from '@/db/models/product.model.ts'
import { ColorModel } from '@/db/models/color.model.ts'
import { MaterialModel } from '@/db/models/material.model.ts' // НОВЫЙ ИМПОРТ: MaterialModel

// Обновленный интерфейс для данных формы, включающий новые поля
interface ProductVariantFormData {
    id?: number
    isActive: boolean
    articul: string
    productId: number
    colorId: number // ID цвета
    materialId: number // НОВОЕ ПОЛЕ: ID материала
    length: number
    width: number
    height: number
    box_length: number
    box_width: number // НОВОЕ ПОЛЕ: ширина коробки
    box_height: number
    box_weight: number
    weight: number
    price: number
    quantity: number // НОВОЕ ПОЛЕ: количество
}

const cleanProductVariantFormData = (
    formData: FormData
): ProductVariantFormData => {
    const id = formData.get('id') ? Number(formData.get('id')) : undefined
    const isActive = formData.get('isActive') === 'true'
    const articul = (formData.get('articul') as string).trim()

    const productId = Number(formData.get('productId'))

    // Обработка colorId
    const colorIdRaw = formData.get('colorId')
    // Важно: если select отправляет пустую строку при "Выберите цвет", Number('') даст 0.
    // Если 0 не является валидным ID, тогда нужно предусмотреть это.
    // Если `colorId` должен быть обязательным, то лучше бросить ошибку, если `colorIdRaw` пуст
    const colorId = colorIdRaw ? Number(colorIdRaw) : 0 // Или null, если ваша модель допускает null

    // НОВОЕ: Обработка materialId
    const materialIdRaw = formData.get('materialId')
    const materialId = materialIdRaw ? Number(materialIdRaw) : 0 // Или null, если ваша модель допускает null

    // Обработка числовых полей: если поле пустое, Number('') даст 0.
    // Если в вашей БД поля НЕ NULLABLE и не имеют дефолтного значения,
    // а пустая строка в форме должна означать ошибку или null,
    // то логика должна быть более строгой, например:
    // const length = formData.get('length') === '' ? null : Number(formData.get('length'));
    // Но если 0 допустимо или поля в БД имеют DEFAULTS, то текущий Number() сработает.
    // Для этого примера я оставлю Number(), предполагая, что 0 или дефолты обрабатываются БД.
    // Если вам нужно, чтобы пустые поля были null, сообщите.

    const length = Number(formData.get('length'))
    const width = Number(formData.get('width'))
    const height = Number(formData.get('height'))
    const box_length = Number(formData.get('box_length'))
    const box_width = Number(formData.get('box_width')) // НОВОЕ: box_width
    const box_height = Number(formData.get('box_height'))
    const box_weight = Number(formData.get('box_weight'))
    const weight = Number(formData.get('weight'))

    const price = Number(formData.get('price'))
    const quantity = Number(formData.get('quantity')) // НОВОЕ: quantity

    return {
        id,
        isActive,
        articul,
        productId,
        colorId,
        materialId, // НОВОЕ: materialId
        length,
        width,
        height,
        box_length,
        box_width, // НОВОЕ: box_width
        box_height,
        box_weight,
        weight,
        price,
        quantity // НОВОЕ: quantity
    }
}

export async function handleProductVariantForm(formData: FormData) {
    // try {
    const parsedData = cleanProductVariantFormData(formData)

    // Объект upsertData теперь включает все новые поля
    const upsertData = {
        id: parsedData.id,
        isActive: parsedData.isActive,
        articul: parsedData.articul,
        productId: parsedData.productId,
        colorId: parsedData.colorId,
        materialId: parsedData.materialId, // НОВОЕ: materialId
        length: parsedData.length,
        width: parsedData.width,
        height: parsedData.height,
        box_length: parsedData.box_length,
        box_width: parsedData.box_width, // НОВОЕ: box_width
        box_height: parsedData.box_height,
        box_weight: parsedData.box_weight,
        weight: parsedData.weight,
        price: parsedData.price,
        quantity: parsedData.quantity // НОВОЕ: quantity
    }

    // Проверка существования внешних ключей
    const productExists = await ProductModel.findByPk(parsedData.productId)
    if (!productExists) {
        throw new Error(
            `Product with ID ${parsedData.productId} does not exist.`
        )
    }

    //Проверка уникальности артикула варианта
    const unicArticul = await ProductVariantModel.findOne({
        where: { articul: parsedData.articul }
    })
    if (unicArticul) {
        throw new Error(
            `Вариант с артикулом ${parsedData.articul} уже существует.`
        )
    }

    // Проверка Color
    if (parsedData.colorId === 0 || isNaN(parsedData.colorId)) {
        throw new Error('Цвет не выбран или некорректен.')
    }
    const colorExists = await ColorModel.findByPk(parsedData.colorId)
    if (!colorExists) {
        throw new Error(`Color with ID ${parsedData.colorId} does not exist.`)
    }

    // НОВОЕ: Проверка Material
    if (parsedData.materialId === 0 || isNaN(parsedData.materialId)) {
        throw new Error('Материал не выбран или некорректен.')
    }
    const materialExists = await MaterialModel.findByPk(parsedData.materialId)
    if (!materialExists) {
        const [ productVariant, created ] = await ProductVariantModel.upsert(
            upsertData,
            {
                returning: true // Возвращает обновленную/созданную запись
            }
        )

        if (created) {
            console.log('Product variant created:', productVariant.toJSON())
        } else {
            console.log('Product variant updated:', productVariant.toJSON())
        }
        revalidatePath(`/admin/products/${upsertData.productId}`)
        return { success: true, variant: productVariant.toJSON() }
        // } catch (e: any) {
        //     console.error('Ошибка обработки формы варианта продукта:', e.message)
        //     throw new Error(`Ошибка сохранения варианта: ${e.message}`)
    }
}
