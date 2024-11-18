'use server'
import { OrderedProductsModel } from '@/db/models/orderedProducts.model'
import { revalidatePath } from 'next/cache'

export async function incrementQuantity(productId: number) {
    try {
        // let orderedProduct = await OrderedProductsModel.findByPk(productId)
        let orderedProduct = await OrderedProductsModel.findOne({where: {
                product: productId
            }})

        const instantOrderId = parseInt(Date.now().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0'))


        // Если записи нет, создаём новую с начальным количеством 1
        if (!orderedProduct) {
            orderedProduct = await OrderedProductsModel.create({
                orderId: instantOrderId,
                product: productId,
                quantity: 1,
                status: 1
            })
        } else {
            // Если запись существует, увеличиваем количество
            const newQuantity = orderedProduct.quantity + 1
            await orderedProduct.update({ quantity: newQuantity })
        }

        revalidatePath('/cart')
        return orderedProduct.quantity
    } catch (error) {
        console.error('Error incrementing quantity:', error)
        throw error
    }
}

export async function decrementQuantity(productId: number) {
    try {
        const orderedProduct = await OrderedProductsModel.findOne({
            where: {
                product: productId
            }
        })

        if (!orderedProduct) {
            // Если записи нет, возвращаем 0 или можно выбрать другое поведение
            return 0
        }

        if (orderedProduct.quantity <= 1) {
            // Если количество 1 или меньше, можно либо удалить продукт, либо оставить как есть
            return orderedProduct.quantity
        }

        const newQuantity = orderedProduct.quantity - 1
        await orderedProduct.update({ quantity: newQuantity })

        revalidatePath('/cart')
        return newQuantity
    } catch (error) {
        console.error('Error decrementing quantity:', error)
        throw error
    }
}