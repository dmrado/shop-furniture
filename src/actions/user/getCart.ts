'use server'
import { CartModel } from '@/db/models'
import { ProductModel } from '@/db/models'
import { InferAttributes } from 'sequelize'

export type CartRow = Omit<InferAttributes<CartModel>, 'user' | 'userId' | 'discount' | 'createdAt' | 'updatedAt' | 'productId'>
    & Required<Pick<CartModel, 'product'>>

export async function getCart(): Promise<CartRow[]> {
    // fixme: remove timeout
    await new Promise(resolve => setTimeout(resolve, 3000))

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
