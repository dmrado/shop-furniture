'use server'

import {ProductModel} from '@/db/models/product.model'
import {revalidatePath} from 'next/cache'
import {notFound} from 'next/navigation'
import {CartModel} from '@/db/models/cart.model'

export async function getProductBiId(id: string) {
    try {
        console.log('>>>>>>>> >> productId:', id)
        const product = await ProductModel.findByPk(id)
        if (!product) {
            return notFound()
        }

        const plainProduct = {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
        revalidatePath(`/products/${id}`)
        return {success: true, data: plainProduct}
    } catch (error) {
        return {success: false, error: 'Failed to fetch product'}
    }
}

export const putProductToCart = async (productId: number) => {
    try{
        const userId = 1

        const existingCartItem = await CartModel.findOne({
            where: {
                productId,
                userId
            }
        })
        if (existingCartItem) {
            await existingCartItem.update({
                quantity: existingCartItem.quantity + 1
            })
            revalidatePath('/cart')
            return existingCartItem
        }

        const newProductInCart = await CartModel.create({
            productId,
            userId: 1,
        })
        if (!newProductInCart) {
            return notFound()
        }
        revalidatePath('/products')
        return
    }catch(error){
        throw new Error('Не вышло положить товар в корзину')
    }

}


