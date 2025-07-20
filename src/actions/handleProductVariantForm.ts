'use server'

import { revalidatePath } from 'next/cache'
import { ProductVariantModel } from '@/db/models/product_variant.model' // Убедитесь, что ProductVariantModel импортирован
import { ProductModel } from '@/db/models/product.model.ts'
import { ColorModel } from '@/db/models/color.model.ts'

interface ProductVariantFormData {
    id?: number
    isActive: boolean
    articul: string
    productId: number
    colorId: number
    length: number
    width: number
    height: number
    box_length: number
    box_height: number
    box_weight: number
    weight: number
    price: number
}

const cleanProductVariantFormData = (formData: FormData): ProductVariantFormData => {
    const id = formData.get('id') ? Number(formData.get('id')) : undefined
    const isActive = formData.get('isActive') === 'true'
    const articul = formData.get('articul') as string

    const productId = Number(formData.get('productId'))
    // Проверка на 'NaN' для colorId, если select ничего не выбрано или пустая строка
    const colorIdRaw = formData.get('colorId')
    const colorId = colorIdRaw ? Number(colorIdRaw) : 0

    const length = Number(formData.get('length'))
    const width = Number(formData.get('width'))
    const height = Number(formData.get('height'))
    const box_length = Number(formData.get('box_length'))
    const box_height = Number(formData.get('box_height'))
    const box_weight = Number(formData.get('box_weight'))
    const weight = Number(formData.get('weight'))

    const price = Number(formData.get('price')) // Price comes as a string from form

    return {
        id,
        isActive,
        articul,
        productId,
        colorId,
        length,
        width,
        height,
        box_length,
        box_height,
        box_weight,
        weight,
        price,
    }
}

export async function handleProductVariantForm(formData: FormData) {
    try {
        const parsedData = cleanProductVariantFormData(formData)

        const upsertData = {
            id: parsedData.id, // Если есть ID, Sequelize будет обновлять
            isActive: parsedData.isActive,
            articul: parsedData.articul,
            productId: parsedData.productId,
            colorId: parsedData.colorId,
            length: parsedData.length,
            width: parsedData.width,
            height: parsedData.height,
            box_length: parsedData.box_length,
            box_height: parsedData.box_height,
            box_weight: parsedData.box_weight,
            weight: parsedData.weight,
            price: parsedData.price,
        }

        // Проверка существования внешних ключей (необязательно, но рекомендуется для повышения надёжности)
        const productExists = await ProductModel.findByPk(parsedData.productId)
        if (!productExists) {
            throw new Error(`Product with ID ${parsedData.productId} does not exist.`)
        }

        // Проверяем, если colorId не 0 или null (если 0 - это допустимое значение, скорректируйте логику)
        // Если colorId обязателен и не должен быть 0
        if (parsedData.colorId === 0 || isNaN(parsedData.colorId)) { // Добавлена проверка на NaN
            throw new Error('Цвет не выбран или некорректен.')
        }
        const colorExists = await ColorModel.findByPk(parsedData.colorId)
        if (!colorExists) {
            throw new Error(`Color with ID ${parsedData.colorId} does not exist.`)
        }

        const [ productVariant, created ] = await ProductVariantModel.upsert(upsertData, {
            returning: true, // Возвращает обновленную/созданную запись
        })

        if (created) {
            console.log('Product variant created:', productVariant.toJSON())
        } else {
            console.log('Product variant updated:', productVariant.toJSON())
        }
        revalidatePath(`/admin/products/${upsertData.productId}`)
        return { success: true, variant: productVariant.toJSON() }
    } catch (e: any) {
        console.error('Ошибка обработки формы варианта продукта:', e.message)
        throw new Error(`Ошибка сохранения варианта: ${e.message}`)
    }
}