'use server'
// import {OrderedProductsModel} from '@/db/models/orderedProducts.model'
import { CartModel, ProductModel } from '@/db/models'
import { InferAttributes } from 'sequelize'

export type CartRow = Omit<InferAttributes<CartModel>, 'user' | 'userId' | 'discount' | 'createdAt' | 'updatedAt' | 'productId'>
    & Required<Pick<CartModel, 'product'>>

export async function getCart(): Promise<CartRow[]> {
    // fixme: remove timeout
    await new Promise(resolve => setTimeout(resolve, 1000))

    const { rows } = await CartModel.findAndCountAll({
        include: [{
            model: ProductModel,
            as: 'product',
            // required: false,
            attributes: [
                // todo: remove reduntant atributes
                'id',
                'isActive',
                'articul',
                'sku',
                'name',
                'description_1',
                'description_2',
                'length',
                'width',
                'height',
                'weight',
                'box_length',
                'box_height',
                'box_weight',
                'old_price',
                'new_price',
                'primary_color',
                'secondary_color',
                // 'inStock',
                'createdAt',
                'updatedAt',
                'image',
            ]
        }],
        where: { userId: 1 }
    })
    console.log('rows from getCart:', JSON.stringify(rows[0], null, 2))

    return rows.map(cart => {
        if (!cart.product) {
            throw new Error(`Cart row with id ${cart.id} contains no product`)
        }

        return {
            id: cart.id,
            quantity: cart.quantity,
            product: {
                id: cart.product.id,
                isNew: cart.product.isNew,
                isActive: cart.product.isActive,
                articul: cart.product.articul,
                sku: cart.product.sku,
                name: cart.product.name,
                description_1: cart.product.description_1,
                description_2: cart.product.description_2,
                length: cart.product.length,
                width: cart.product.width,
                height: cart.product.height,
                weight: cart.product.weight,
                box_length: cart.product.box_length,
                box_height: cart.product.box_height,
                box_weight: cart.product.box_weight,
                image: cart.product.image,
                old_price: cart.product.old_price,
                new_price: cart.product.new_price,
                primary_color: cart.product.primary_color,
                secondary_color: cart.product.secondary_color,
            }
        }})
}


export const updateQuantityAction = async ({ id, newQuantity }: { id: number, newQuantity: number }): Promise<CartRow> => {

    if (newQuantity <= 1) {
        await CartModel.update(
            { quantity: 1 },
            { where: { id } }
        )
    } else {
        await CartModel.update(
            { quantity: newQuantity },
            { where: { id } }
        )
    }
    const updatedCart = await CartModel.findByPk(id, { include: [{ model: ProductModel, as: 'product' }] })

    if (!updatedCart) {
        throw new Error('updated cart not found')
    }

    // revalidatePath('/cart')//для подсчета итого
    return updatedCart.toJSON() as CartRow
}

export const deleteCartRowAction = async (cartId: number) => {
    await CartModel.destroy({
        where: {
            id: cartId,
            // userId: 1
        }
    })
    // await OrderedProductsModel.destroy({
    //     where: {
    //         product: productId
    //     }
    // })
    // revalidatePath('/cart')//todo проверить работает ли после создания запроса к OrderedProductsModel и рендера оставшихся в корзине товаров на cart page
    // redirect('/cart')
}
