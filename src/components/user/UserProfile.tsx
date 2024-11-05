'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserAddressForm from '@/components/user/UserAddressForm'
import UserOrdersHistory from '@/components/user/UserOrdersHistory'
import {User} from "@/db/types/interfaces";

//todo регистрация в личном кабинете, фото юзера получаем из яндекса или гугла

// const createUser = (name: string, age: number): User => {
//     return { name }
// }

// const user = createUser('Иван', 30)

// Функция для приветствия пользователя
// const greetUser = (user: User): string => {
//     console.log(greetUser(user))
//     return `Здравствуйте, ${user.uname}`
// }

type UserProfileProps = {
    user: User;
    previousOrders: any;
}
const UserProfile = ({ user, previousOrders }: UserProfileProps) => {
    // todo отправка из корзины собственно заказа и выбранного адреса доставки причем для каждой копии товара может бчть уникальный адрес из массива адресов доставки корпоративного юзера
    return (
        <div className="p-8 mx-auto max-w-6xl">
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
                    <p className="text-gray-600">{user.surName}</p>
                    <p className="text-gray-600">{user.fatherName}</p>
                </div>
            </div>


{/*todo а странице profile получить адреса из модели orders и реализовать условие ниже*/}
            {/* Список адресов доставки */}
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Ваши адреса</h2>
                {!user.addresses || user.addresses?.length === 0 ? (
                    <p>Нет зарегистрированных адресов доставки</p>
                ) : (
                    <>
                        <ul className="mb-4">
                            {user.addresses.map(item => (
                                // item.addressId
                                //     === editId
                                //    ? <UserAddressForm key={item.id} id={item.id} fullNameReceiver={item.fullNameReceiver} postalCode={item.postalCode} city={item.city} street={item.street} phoneNumber={item.phoneNumber}
                                //      onSubmit={hideAlertForm}
                                // /> :
                                    <li key={item.id} className="flex justify-between mb-2 border-b border-gray-200">
                                        <span> {item.city}, {item.street}, этаж  {item.home} подъезд {item.corps}, домофон {item.appart}
                                            <br/> Телефон: {item.phone}</span>
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

export default UserProfile

