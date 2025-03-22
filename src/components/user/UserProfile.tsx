'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Profile } from '@/db/models/profile.model'
import { Address } from '@/db/models/address.model'
import UserAddressForm from '@/components/user/UserAddressForm'
import UserOrdersHistory from '@/components/user/UserOrdersHistory'
import {UserNameForm} from "@/components/user/UserNameForm"

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
    user: Pick<Profile, 'name' | 'surName' | 'fatherName' | 'isAgreed' | 'id' > & {
        email: string
        photo: string
    },
    previousOrders: any
    addresses: Address[]
}
const UserProfile = ({ user, previousOrders, addresses }: UserProfileProps) => {
    // todo отправка из корзины собственно заказа и выбранного адреса доставки причем для каждой копии товара может быть уникальный адрес из массива адресов доставки корпоративного юзера

    // для Disclosure согласия на обработку перс данных
    // стейт для состояния согласия на обработку перс данных
    // const [agreed, setAgreed] = useState<boolean>(user.isAgreed)

    // for NewAddressModal
    const [ isOpenModal, setIsOpenModal ] = useState(false)

    // для изменения Розового зайки на ФИО
    const [ isOpenNameModal, setIsOpenNameModal ] = useState(false)

    // для полукчения editId редактируемого адреса
    const [ updatingId, setUpdatingId ] = useState(null)

    useEffect(() => {

    }, [ addresses, user.name ])

    return <>
        {/*<Agreement*/}
        {/*    setAgreed={setAgreed}*/}
        {/*    agreed={agreed}*/}
        {/*    userId={user.id}*/}
        {/*/>*/}
        {/*{agreed &&*/}
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
                        src={user.photo}
                        alt={user.name}
                        // layout="fill"
                        objectFit="cover"/>
                </div>
                <div>
                    {/*todo Здесь у нас Розовый зайка, добавить функционал изменения имени в ProfileModel, тогда с page передавать и profile.user, и session.user"*/}
                    <h2 className="text-xl">{user.name}</h2>
                    <p className="text-gray-600">{user.fatherName}</p>
                    <p className="text-gray-600">{user.surName}</p>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            <div className="relative group">
                <button
                    type="button"
                    onClick={() => {
                        setIsOpenNameModal(true)
                    }
                }
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                    {`Я не ${user.name}`}
                </button>
                <div
                    className="absolute bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                    {`Изменить ${user.name} на ФИО`}
                </div>
            </div>
            {/*todo а странице profile получить адреса из модели orders и реализовать условие ниже*/}
            {/* Список адресов доставки */}
            <div className="my-8 bg-white p-4 rounded-lg shadow-md">
                <button
                    type="button"
                    onClick={() => setIsOpenModal(true)}
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                    Добавить новый адрес
                </button>
                {/*todo после изменения Transition-component v1.7 на transition-attribute 2.1 пофиксить Редактировать*/}
                <h2 className="text-xl font-semibold mb-4">Ваши адреса</h2>
                {!addresses ? (
                    <p>Нет зарегистрированных адресов доставки</p>
                ) : (
                    <>
                        <ul className="mb-4">
                            {addresses.map(address => (
                                // address.id === updatingId ?
                                //     <UserAddressForm key={address.id}
                                //                      id={address.id}
                                //                      phone={address.phone}
                                //                      city={address.city}
                                //                      street={address.street}
                                //                      home={address.home}
                                //                      corps={address.corps}
                                //                      appart={address.appart}
                                //                      isMain={address.isMain}
                                //                      onSubmit={() => {
                                //                      }}
                                //     /> :
                                    <li key={address.id}
                                        className="flex justify-between mb-2 border-b border-gray-200">
                                        <span>  {address.city},<br/>
                                            {address.street},
                                                дом {address.home},
                                                корпус {address.corps},
                                                квартира {address.appart},
                                            <br/> Телефон: {address.phone}</span>
                                        <button onClick={() => setUpdatingId(address.id)}
                                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 h-10">
                                            Редактировать
                                        </button>
                                    </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <UserAddressForm user={user} isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)}/>
            <UserNameForm user={user} isOpenModal={isOpenNameModal} onClose={() => setIsOpenNameModal(false)}/>
            <UserOrdersHistory previousOrders={previousOrders}/>
        </div>
        {/*}*/}
    </>
}

export default UserProfile
