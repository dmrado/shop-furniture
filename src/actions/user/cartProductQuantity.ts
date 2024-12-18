'use server'
// import {OrderedProductsModel} from '@/db/models/orderedProducts.model'
import {revalidatePath} from 'next/cache'
// import {redirect} from 'next/navigation'
import {CartModel, ProductModel} from '@/db/models'


export const updateQuantityAction = async ({id, newQuantity}) => {

    if (newQuantity <= 1) {
        await CartModel.update(
            {quantity: 1},
            {where: {id}}
        )
    } else {
        await CartModel.update(
            {quantity: newQuantity},
            {where: {id}}
        )
    }
    const updatedCart = await CartModel.findByPk(id, {include: [{model: ProductModel, as: 'product'}]})

    if (!updatedCart) {
        throw new Error('updated cart not found')
    }

    revalidatePath('/cart')//для подсчета итого
    return updatedCart.toJSON()
}


export const cartProductDelete = async (productId: number) => {
    await CartModel.destroy({
        where: {
            productId: productId,
            userId: 1
        }
    })
    // await OrderedProductsModel.destroy({
    //     where: {
    //         product: productId
    //     }
    // })
    revalidatePath('/cart')//todo проверить работает ли после создания запроса к OrderedProductsModel и рендера оставшихся в корзине товаров на cart page
    // redirect('/cart')
}
