'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserAddressForm from '@/components/user/UserAddressForm'
import UserOrdersHistory from '@/components/user/UserOrdersHistory'
import Agreement from "@/components/site/Agreement";
import {OuruserModel} from "@/db/models";

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
    user: OuruserModel;
    previousOrders: any;
}
const UserProfile = ({ user, previousOrders }: UserProfileProps) => {
    // todo отправка из корзины собственно заказа и выбранного адреса доставки причем для каждой копии товара может быть уникальный адрес из массива адресов доставки корпоративного юзера
    
    // для Disclosure согласия на обработку перс данных
    // стейт для состояния согласия на обработку перс данных
    const [agreed, setAgreed] = useState<boolean>(false)

    // for NewAddressModal
    const [ isOpenModal, setIsOpenModal ] = useState(false)

    return <>
        <Agreement
            setAgreed={setAgreed}
            agreed={agreed}
        />
        {agreed &&
            <div className="p-8 mx-auto max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>
                <Link href={'/api/auth/signout'}>
                <button
                    type="button"
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                    Выйти
                </button>
                </Link>
                <div className="flex items-center mb-8">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                            width={1000}
                            height={760}
                            className="hidden md:block"
                            alt="Screenshots of the dashboard project showing desktop version"
                            src={user.photo}
                            // alt={user.name}
                            layout="fill"
                            objectFit="cover"/>
                    </div>
                    <div>
                        <h2 className="text-xl">{user.name}</h2>
                        <p className="text-gray-600">{user.fatherName}</p>
                        <p className="text-gray-600">{user.surName}</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>


                {/*todo а странице profile получить адреса из модели orders и реализовать условие ниже*/}
                {/* Список адресов доставки */}
                <div className="my-8 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Ваши адреса</h2>
                    {!user.addresses || user.addresses?.length === 0 ? (
                        <p>Нет зарегистрированных адресов доставки</p>
                    ) : (
                        <>
                            <ul className="mb-4">
                                {user.addresses.map(item => (
                                    // products.addressId
                                    //     === editId
                                    //    ? <UserAddressForm key={products.id} id={products.id} fullNameReceiver={products.fullNameReceiver} postalCode={products.postalCode} city={products.city} street={products.street} phoneNumber={products.phoneNumber}
                                    //      onSubmit={hideAlertForm}
                                    // /> :
                                    <li key={item.id} className="flex justify-between mb-2 border-b border-gray-200">
                                        <span>  {item.city},<br/>
                                            {item.street},
                                                дом {item.home},
                                                корпус {item.corps},
                                                квартира {item.appart},
                                            <br/> Телефон: {item.phone}</span>
                                        <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 h-10">
                                            Редактировать
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <UserAddressForm user={user} onClose={() => setIsOpenModal(false)}/>
                <UserOrdersHistory previousOrders={previousOrders}/>
            </div>
        }
    </>
}

export default UserProfile

