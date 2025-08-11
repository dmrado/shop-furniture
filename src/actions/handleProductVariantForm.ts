'use server'

import { revalidatePath } from 'next/cache'
import { ProductVariantModel } from '@/db/models/product_variant.model'
import { ProductModel } from '@/db/models/product.model.ts'
import { ColorModel } from '@/db/models/color.model.ts'
import { MaterialModel } from '@/db/models/material.model.ts'

//  интерфейс для данных формы, включающий новые поля
interface ProductVariantFormData {
    id?: number
    isActive: boolean
    articul: string
    productId: number
    colorId: number
    materialId: number
    length: number
    width: number
    height: number
    box_length: number
    box_width: number
    box_height: number
    box_weight: number
    weight: number
    price: number
    quantity: number
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
    // Важно: если select отправляет пустую строку при "Выберите цвет", Number('') даст 0. Если 0 не является валидным ID, тогда нужно предусмотреть это. Если `colorId` должен быть обязательным, то лучше бросить ошибку, если `colorIdRaw` пуст
    const colorId = colorIdRaw ? Number(colorIdRaw) : 0 // Не null, модель не допускает null

    // Обработка materialId
    const materialIdRaw = formData.get('materialId')
    const materialId = materialIdRaw ? Number(materialIdRaw) : 0 // модель допускает null

    // Number('') возвращает 0. модели ProductVariantModel и ProductModel настроены так, что для всех числовых полей (length, width, price и т.д.), которые не могут быть null (allowNull: false), они спокойно примут значение 0. Поэтому, если пользователь оставит какое-то из этих полей пустым в форме, formData отправит пустую строку, cleanProductVariantFormData превратит её в 0, и база данных успешно сохранит эту 0 без ошибки

    const length = Number(formData.get('length'))
    const width = Number(formData.get('width'))
    const height = Number(formData.get('height'))
    const box_length = Number(formData.get('box_length'))
    const box_width = Number(formData.get('box_width'))
    const box_height = Number(formData.get('box_height'))
    const box_weight = Number(formData.get('box_weight'))
    const weight = Number(formData.get('weight'))

    const price = Number(formData.get('price'))
    const quantity = Number(formData.get('quantity'))

    return {
        id,
        isActive,
        articul,
        productId,
        colorId,
        materialId,
        length,
        width,
        height,
        box_length,
        box_width,
        box_height,
        box_weight,
        weight,
        price,
        quantity
    }
}

export async function handleProductVariantForm(formData: FormData) {
    // try {
    const parsedData = cleanProductVariantFormData(formData)
    const upsertData = {
        id: parsedData.id,
        isActive: parsedData.isActive,
        articul: parsedData.articul,
        productId: parsedData.productId,
        colorId: parsedData.colorId,
        materialId: parsedData.materialId,
        length: parsedData.length,
        width: parsedData.width,
        height: parsedData.height,
        box_length: parsedData.box_length,
        box_width: parsedData.box_width,
        box_height: parsedData.box_height,
        box_weight: parsedData.box_weight,
        weight: parsedData.weight,
        price: parsedData.price,
        quantity: parsedData.quantity
    }

    // Проверка существования внешних ключей
    const productExists = await ProductModel.findByPk(parsedData.productId)
    if (!productExists) {
        throw new Error(
            `Продукт с ID ${parsedData.productId}  не существует.`
        )
    }

    const unicArticul = await ProductVariantModel.findOne({
        where: { articul: parsedData.articul }
    })
    // Эта проверка уникальности должна учитывать, что мы редактируем существующий вариант. Если ID совпадают, значит, ты просто редактируешь тот же самый вариант, и всё в порядке.
    if (unicArticul && unicArticul.id !== parsedData.id) {
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
        throw new Error(`Цвет с ID ${parsedData.colorId} не существует.`)
    }

    if (parsedData.materialId === 0 || isNaN(parsedData.materialId)) {
        throw new Error('Материал не выбран или некорректен.')
    }
    const materialExists = await MaterialModel.findByPk(parsedData.materialId)
    if (!materialExists) {
        throw new Error(`Материал c ID ${parsedData.materialId} не существует.`)
    }

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
}
