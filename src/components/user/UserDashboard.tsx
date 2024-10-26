'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserAddressForm from '@/components/user/UserAddressForm'
import UserOrdersHistory from '@/components/user/UserOrdersHistory'

type User = {
    name: string;
    email: 'ivan@example.com',
    // photo: 'https://via.placeholder.com/150',
    userAddress:
        {
            fullName: '',
            street: '',
            city: '',
            postalCode: '',
            phoneNumber: ''
        }
}

//todo регистрация в личном кабинете, фото юзера получаем из яндекса или гугла

// const createUser = (name: string, age: number): User => {
//     return { name }
// }

// const user = createUser('Иван', 30)

// Функция для приветствия пользователя
const greetUser = (user: User): string => {
    console.log(greetUser(user))
    return `Здравствуйте, ${user.name}`
}


const UserDashboard = ({ user, cartItems, previousOrders }) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0)
    // todo отправка из корзины собственно заказа и выбранного адреса доставки причем для каждой копии товара может бчть уникальный адрес из массива адресов доставки корпоративного юзера

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>

            <div className="flex items-center mb-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                        // width={1000}
                        // height={760}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"

                        // src={user.photo}
                        // alt={user.name}
                        layout="fill"
                        objectFit="cover"/>
                </div>
                <div>
                    <h2 className="text-xl">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Ваши товары</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="relative w-full h-40 mb-4">
                            <Image
                                className="hidden md:block rounded-md"
                                // width={1000}
                                // height={760}
                                layout="fill"
                                objectFit="cover"
                                src={item.image}
                                alt={item.title}
                            />
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                        <p className="text-sm text-gray-400">Арт: {item.sku}</p>
                        <p className="text-xl font-bold mt-2 text-right">${item.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Корзина */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Корзина</h2>
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 h-10 flex-shrink-0">
                        Оформить заказ
                    </button>
                </div>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Корзина пуста.</p>
                ) : (
                    <>
                        <ul className="mb-4 border-t border-gray-200 pt-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between mb-3 py-2 border-b border-gray-200">
                                    <span className="text-gray-800">{item.title}</span>
                                    <span className="text-gray-600">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold text-xl text-gray-800">
                            <span>Итого:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </>
                )}
            </div>
{/*todo UserAddressForm передать юзера с его  item.addressId */}
            {/* Список адресов доставки */}
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Ваши адреса</h2>
                {user.userAddress.length === 0 ? (
                    <p>Нет зарегистрированных адресов доставки</p>
                ) : (
                    <>
                        <ul className="mb-4">
                            {user.userAddress?.map(item => (
                                // item.addressId
                                    // === editId
                                    // ? <UserAddressForm key={item.id} id={item.id} fullNameReceiver={item.fullNameReceiver} postalCode={item.postalCode} city={item.city} street={item.street} phoneNumber={item.phoneNumber}
                                    //     // onSubmit={hideAlertForm}
                                    // /> :
                                    <li key={item.id} className="flex justify-between mb-2 border-b border-gray-200">
                                        <span>Получатель: {item.fullNameReceiver}; {item.postalCode}; {item.city}; {item.street}; Телефон: {item.phoneNumber}</span>
                                        <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 h-10">
                                            Отредактировать
                                        </button>
                                    </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>


            <UserAddressForm user={user}/>
            <UserOrdersHistory previousOrders={previousOrders}/>
        </div>
    )
}

export default UserDashboard

