import UserCart from '@/components/user/UserCart'
import {CartModel} from '@/db/models/cart.model'
import {ProductModel} from '@/db/models/product.model'

const CartPage = async () => {

    // todo получение данных по выбранным товарам, подсчет, скидка, скелетон

    const cartData = await CartModel.findAndCountAll({
        include: [{
            model: ProductModel,
            as: 'products',
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
    if(!cartData || !cartData.rows.length){
        return 'Корзина пуста'
    }
    console.log('Raw cart data:', JSON.stringify(cartData.rows[0], null, 2))

    const cartList = cartData.rows.map(cartProducts => ({
        // Поля из таблицы carts
        id: cartProducts.id,
        productId: cartProducts.productId,
        quantity: cartProducts.quantity,
        userId: cartProducts.userId,
        datetime: cartProducts.datetime,
        createdAt: cartProducts?.createdAt,
        updatedAt: cartProducts?.updatedAt,
        discount: cartProducts.discount,
        // Поля из таблицы products
        product_id: cartProducts.products?.id,
        isActive: cartProducts.products?.isActive,
        articul: cartProducts.products?.articul,
        sku: cartProducts.products?.sku,
        name: cartProducts.products?.name,
        description_1: cartProducts.products?.description_1,
        description_2: cartProducts.products?.description_2,
        length: cartProducts.products?.length,
        width: cartProducts.products?.width,
        height: cartProducts.products?.height,
        weight: cartProducts.products?.weight,
        box_length: cartProducts.products?.box_length,
        box_height: cartProducts.products?.box_height,
        box_weight: cartProducts.products?.box_weight,
        image: cartProducts.products?.image,
        old_price: cartProducts.products?.old_price,
        new_price: cartProducts.products?.new_price,
        primary_color: cartProducts.products?.primary_color,
        secondary_color: cartProducts.products?.secondary_color,
        inStock: cartProducts.products?.inStock
    }))

    // todo не забыть поменять значение new_price
    console.log('>>>>> >>> this is cartList', cartList)

    return <>
        <UserCart cartProducts={cartList}/>
    </>
}

export default CartPage