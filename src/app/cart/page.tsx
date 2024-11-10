import React from 'react'
import UserCart from "@/components/user/UserCart"
import {CartModel} from '@/db/models/cart.model'
import {ProductModel} from "@/db/models/product.model";

const cartItems = [
    {
        id: 1,
        sku: 1111,
        title: 'Элитный диван',
        description: 'Удобный и стильный диван для вашего дома.',
        price: 1200,
        image: '/modulnyj-divan.jpg',
    },
    {
        id: 2,
        sku: 1112,
        title: 'Кофейный столик',
        description: 'Красивая и функциональная мебель.',
        price: 400,
        image: '/kofeinii-stolik-elite.webp',
    },
    {
        id: 3,
        sku: 1113,
        title: 'Славянский шкаф',
        description: 'Красивая и функциональная мебель.',
        price: 2700,
        image: '/slavianskii-shkaf.jpg',
    },
    {
        id: 4,
        sku: 1114,
        title: 'Тумбочка для славянского шкафа',
        description: 'Красивая и функциональная мебель.',
        price: 300,
        image: '/tumbochka-for-slavianskii-shkaf.jpg',
    },
]

const CartPage = async () => {

    // todo получение данных по выбранным товарам, подсчет, скидка, скелетон

    const cartData = await CartModel.findAndCountAll({
        include: [{
            model: ProductModel,
            as: 'products',
            required: false, // используйте true, если нужны только записи с существующими продуктами
            attributes: ['name', 'description_1', 'weight', 'image']
        }]
    });


    if(!cartData || !cartData.rows.length){
        return 'Корзина пуста'
    }
    console.log('Raw cart data:', JSON.stringify(cartData.rows[0], null, 2))

    const cartList = cartData.rows.map(cartProducts => ({
        id: cartProducts.id,
        userId: cartProducts.userId,
        datetime: cartProducts.datetime,
        quantity: cartProducts.quantity,
        discount: cartProducts.discount,
        name: cartProducts.products?.name,
        description_1: cartProducts.products?.description_1,
        weight: cartProducts.products?.weight,
        image: cartProducts.products?.image,
        price: cartProducts.products?.weight,
    }))
    // todo не забыть поменять значение new_price
    console.log('>>>>> >>> this is cartList', cartList)

    return <>
        <UserCart cartProducts={cartList}/>
    </>
}

export default CartPage