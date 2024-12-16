'use server'
import {CartModel} from '@/db/models'
import {ProductModel} from '@/db/models'

export async function getCart() {
    const { rows } = await CartModel.findAndCountAll({
        include: [{
            model: ProductModel,
            as: 'product',
            required: false,
            attributes: [
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
                'inStock',
                'createdAt',
                'updatedAt',
                'image',
            ]
        }],
        where: { userId: 1 }
    })
    console.log('Raw cart data from getFinalAmount:', JSON.stringify(rows[0], null, 2))

    return rows.map(cart => ({
        id: cart.id,
        quantity: cart.quantity,
        product: {
            id: cart.product.id,
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
            inStock: cart.product.inStock
        }
    }))
}
