'use server'
import {CartModel} from '@/db/models/cart.model'
import {ProductModel} from '@/db/models/product.model'

export async function getFinalAmount() {
    const cartData = await CartModel.findAndCountAll({
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
        }]
    })
    if (!cartData || !cartData.rows.length) {
        console.log('Корзина пуста from getFinalAmount')
        return {
            count: 0,
            cartList: []
        }
    }
    console.log('Raw cart data from getFinalAmount:', JSON.stringify(cartData.rows[0], null, 2))

    const cartList = cartData.rows.map(cart => ({
        quantity: cart?.quantity,
        product: cart.product ? {
            new_price: cart.product.new_price,
            old_price: cart.product.old_price
        } : null
    }))

    return  {
        count: cartData.count,
        cartList: cartList
    }
}
