'use client'
import React, {useEffect, useState} from 'react'
import {handleUserAddressForm} from '@/actions/user/handleUserAddressForm'
import {User as UserInterface} from '@/db/types/interfaces'

const UserAddressForm = ({user}: UserInterface) => {

    // Состояние для сохранения в БД адреса доставки адреса доставки
    const [deliveryAddress, setDeliveryAddress] = useState({
        id: user?.id || '',
        name: user?.name || '',
        surName: user?.surName || '',
        fatherName: user?.fatherName || '',
        email: user?.email || '',
        isActive: user?.isActive || false,
        canContact: user?.canContact || false,
        city: user?.addresses?.[0]?.city || '',
        phone: user?.addresses?.[0]?.phone || '',
        street: user?.addresses?.[0]?.street || '',
        home: user?.addresses?.[0]?.home || '',
        corps: user?.addresses?.[0]?.corps || '',
        appart: user?.addresses?.[0]?.appart || '',
        userId: user?.addresses?.[0]?.userId || '',
        isMain: user?.addresses?.[0]?.isMain || false
    })

    //иначе "Новый адрес доставки" не обновляется внутри формы редактирования после изменения юзера, впрочем юзер здесь будет только один, но не аккуратненко как-то
    useEffect(() => {
        setDeliveryAddress({
            id: user?.id || '',
            name: user?.name || '',
            surName: user?.surName || '',
            fatherName: user?.fatherName || '',
            email: user?.email || '',
            isActive: user?.isActive || false,
            canContact: user?.canContact || false,
            city: user?.addresses?.[0]?.city || '',
            phone: user?.addresses?.[0]?.phone || '',
            street: user?.addresses?.[0]?.street || '',
            home: user?.addresses?.[0]?.home || '',
            corps: user?.addresses?.[0]?.corps || '',
            appart: user?.addresses?.[0]?.appart || '',
            userId: user?.addresses?.[0]?.userId || '',
            isMain: user?.addresses?.[0]?.isMain || false
        });
    }, [user]); // зависимость от user


    const handleChange = (e) => {
        const {name, value} = e.target
        setDeliveryAddress((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = (deliveryAddress: FormData) => {
        console.log('Адрес доставки:', deliveryAddress)
        handleUserAddressForm(deliveryAddress)
    }
    //todo по сабмиту если есть незавершенный заказ, то есть покупатель перешел для добавления адреса со страницы order page.tsx, нужен (получить id и актуальность заказа) редирект на страницу актуального заказа. Для этого перенести этот сабмит на profile page.tsx и пробросить сюда через пропсы.

    if (!user) {
        return <div>Loading...</div>
    }

    return <div>

        {/* Форма ввода адреса доставки */}
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Новый адрес доставки</h3>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4">

                    <div className="mb-4">
                        <label className="block mb-1">Имя:</label>
                        <input
                            type="text"
                            name="name"
                            value={deliveryAddress.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Телефон:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={deliveryAddress.phone}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={deliveryAddress.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Город:</label>
                        <input
                            type="text"
                            name="city"
                            value={deliveryAddress.city}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Улица:</label>
                        <input
                            type="text"
                            name="street"
                            value={deliveryAddress.street}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Дом:</label>
                        <input
                            type="text"
                            name="home"
                            value={deliveryAddress.home}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Корпус:</label>
                        <input
                            type="text"
                            name="corps"
                            value={deliveryAddress.corps}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Квартира:</label>
                        <input
                            type="text"
                            name="appart"
                            value={deliveryAddress.appart}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 h-10">
                    Сохранить
                </button>
            </form>
        </div>
    </div>
}

export default UserAddressForm