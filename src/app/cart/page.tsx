import React from 'react'
import UserCart from "@/components/user/UserCart"

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



const CartPage = () => {
    // todo получение данных по выбранным товарам, подсчет, скидка, скелетон

    return <>
        <UserCart cartItems={cartItems}/>
    </>
}

export default CartPage