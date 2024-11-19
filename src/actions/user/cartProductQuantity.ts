'use server'
import {OrderedProductsModel} from '@/db/models/orderedProducts.model'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

export const incrementQuantity =  async (productId: number)=> {
    try {
        // let orderedProduct = await OrderedProductsModel.findByPk(productId)
        let orderedProduct = await OrderedProductsModel.findOne({
            where: {
                product: productId
            }
        })

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
            await orderedProduct.update({quantity: newQuantity})
        }

        revalidatePath('/cart')//не требуется
        return orderedProduct.quantity
    } catch (error) {
        console.error('Error incrementing quantity:', error)
        throw error
    }
}

export const decrementQuantity = async (productId: number)=> {
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
        await orderedProduct.update({quantity: newQuantity})

        revalidatePath('/cart')//не требуется
        return newQuantity
    } catch (error) {
        console.error('Error decrementing quantity:', error)
        throw error
    }
}

export const cartProductDelete = async (productId: number) => {

    await OrderedProductsModel.destroy({
        where: {
            product: productId
        }
    })
    revalidatePath('/cart')//todo проверить работает ли после создания запроса к OrderedProductsModel и рендера оставшихся в корзине товаров на cart page
    redirect('/cart')
}