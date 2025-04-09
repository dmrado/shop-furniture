'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Profile } from '@/db/models/profile.model'
import { Address } from '@/db/models/address.model'
import UserAddressForm from '@/components/user/UserAddressForm'
import UserOrdersHistory from '@/components/user/UserOrdersHistory'
import UserNameForm from '@/components/user/UserNameForm'
import UserAddressDeleteModal from '@/components/user/UserAddressDeleteModal'
import { nodeMailerInstantOrder } from '@/actions/NodeMailerInstantOrder'
import Modal from '@/components/site/Modal'

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
    user: Pick<Profile, 'name' | 'surName' | 'fatherName' | 'isAgreed' | 'id'> & {
        email: string
        photo: string
    },
    previousOrders: any
    ad: any
}
const UserProfile = ({ user, previousOrders, ad }: UserProfileProps) => {
    // todo отправка из корзины собственно заказа и выбранного адреса доставки причем для каждой копии товара может быть уникальный адрес из массива адресов доставки корпоративного юзера

    // Пользовательские данные могут понадобиться на UserProfile
    // const [userId, setUserId] = useState(user?.id || '');
    // const [name, setName] = useState(user?.name || '');
    // const [surName, setSurName] = useState(user?.surName || '');
    // const [fatherName, setFatherName] = useState(user?.fatherName || '');
    // const [isActive, setIsActive] = useState(user?.isActive || false);
    // const [canContact, setCanContact] = useState(user?.canContact || false);

    // for NewAddressModal
    const [ isOpenModal, setIsOpenModal ] = useState(false)
    // для изменения Розового зайки на ФИО
    const [ isOpenNameModal, setIsOpenNameModal ] = useState(false)
    // для удаления адреса
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState(false)
    const [ deletingAddressId, setDeletingAddressId ] = useState<number | null>(null)
    // Создаем состояние для хранения адресов и функцию изменения их в компоненте UserAddressDeleteModal одновременно с удалением
    // const [ addressList, setAddressList ] = useState([ ...ad ])

    //fixme
    // useEffect(() => {
    //     setAddressList(addresses || [])
    // }, [ addresses, addressList ])

    // для получения updatingId редактируемого адреса
    const [ updatingAddressId, setUpdatingAddressId ] = useState(null)

    // Функция для открытия модального окна удаления
    const openDeleteModal = (addressId) => {
        setDeletingAddressId(addressId)
        setIsOpenDeleteModal(true)
    }
    const updatingAddress = ad.find(addr => addr.id === updatingAddressId)

    return <>
        {/*<Agreement*/}
        {/*    setAgreed={setAgreed}*/}
        {/*    agreed={agreed}*/}
        {/*    userId={user.id}*/}
        {/*/>*/}
        {/*{agreed &&*/}
        <div className="p-8 mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>

            <div className="flex items-center mb-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                        width={96}
                        height={96}
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
                <Link href={'/api/auth/signout'}>
                    <button
                        type="button"
                        className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                        Выйти
                    </button>
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpenNameModal(true)}
                    title={`Изменить ${user.name} на ФИО`}
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all"
                >{`Я не ${user.name}`}</button>

                <button
                    type="button"
                    onClick={() => setIsOpenModal(true)}
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                    Добавить новый адрес
                </button>
            </div>
            {/*todo а странице profile получить адреса из модели orders и реализовать условие ниже*/}
            {/* Список адресов доставки */}
            <div className="my-8 bg-white p-4 rounded-lg shadow-md">

                {/*todo после изменения Transition-component v1.7 на transition-attribute 2.1 пофиксить Редактировать*/}
                <h2 className="text-xl font-semibold mb-4">Ваши адреса</h2>
                {ad.length === 0 ? (
                    <p>Нет зарегистрированных адресов доставки</p>
                ) : (
                    <>
                        <ul className="mb-4">
                            {ad.map(address => (
                                <li key={address.id}
                                    className="flex justify-between mb-2 border-b border-gray-200">
                                    <span>{address.city},<br/>
                                        {address.street},
                                                    дом {address.home},
                                                    корпус {address.corps},
                                                    квартира {address.appart},
                                        <br/> Телефон: {address.phone}</span>

                                    {/*Address row buttons*/}
                                    <div className="relative group">
                                        <button onClick={() => {
                                            setIsOpenModal(true)
                                            setUpdatingAddressId(address.id)
                                        }
                                        }
                                        title='Редактировать адрес'
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500">
                                            <span role="img" aria-label="edit" className="text-xl">
                                            ✏️
                                            </span>
                                        </button>

                                        <button
                                            onClick={
                                                () => {
                                                    openDeleteModal(address.id)
                                                }
                                            }
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500"
                                            title='Удалить адрес'
                                        >
                                            <span role="img" aria-label="delete" className="text-xl">
                                              🗑
                                            </span>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <Modal isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)}
                title='Добавление нового адреса'
                description=''>

                <UserAddressForm user={user} address={updatingAddress} onClose={() => setIsOpenModal(false)}/>
            </Modal>
            <UserNameForm user={user} isOpenModal={isOpenNameModal} onClose={() => setIsOpenNameModal(false)}/>
            {/*<UserOrdersHistory previousOrders={previousOrders}/>*/}
            {/*<UserAddressDeleteModal*/}
            {/*    id={deletingAddressId}*/}
            {/*    setAddressList={setAddressList}*/}
            {/*    isOpenModal={isOpenDeleteModal}*/}
            {/*    onClose={() => setIsOpenDeleteModal(false)}*/}
            {/*/>*/}
        </div>
        {/*}*/}
    </>
}

export default UserProfile
