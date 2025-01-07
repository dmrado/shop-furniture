// 'use server'
// import { ProductModel } from '@/db/models'
// import { revalidatePath } from 'next/cache'
// import { notFound } from 'next/navigation'

// export interface ProductDescription extends InferAttributes<ProductModel> {
//     // color: InferAttributes<ColorModel>[]
//     // color: InferAttributes<StockModel>[]
// }

// export async function getProductBiId(id: string) {
//     try {
//         console.log('>>>>>>>> >> productId:', id)
//         const product = await ProductModel.findByPk(id)
//         if (!product) {
//             return notFound()
//         }

//         const plainProduct = {
//             id: product.id,
//             title: product.name,
//             description: product.description_2,
//             price: product.old_price,
//             image: product.image,
//         }
//         revalidatePath(`/products/${id}`)
//         return { success: true, data: plainProduct }
//     } catch (error) {
//         return { success: false, error: 'Failed to fetch product' }
//     }
// }
