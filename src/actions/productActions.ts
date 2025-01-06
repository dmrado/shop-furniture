'use server'

import { ProductModel } from '@/db/models'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

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
            updatedAt: product.updatedAt,
        }
        revalidatePath(`/products/${id}`)
        return { success: true, data: plainProduct }
    } catch (error) {
        return { success: false, error: 'Failed to fetch product' }
    }
}
