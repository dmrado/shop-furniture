'use server'

import { ProductModel } from '@/db/models'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { CartModel } from '@/db/models'

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
        return { success: true, data: plainProduct }
    } catch (error) {
        return { success: false, error: 'Failed to fetch product' }
    }
}

export const putProductToCartAction = async (productId: number) => {
    console.log('productId', productId)
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
        revalidatePath('/products')
        return { productId: existingCartItem.productId, quantity: existingCartItem.quantity }
    }

    const newProductInCart = await CartModel.create({
        quantity: 1,
        productId,
        userId,
    })
    // if (!newProductInCart) {
    //     return notFound()
    // }
    // revalidatePath('/products')
    // return
}
