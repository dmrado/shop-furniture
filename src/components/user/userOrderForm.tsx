'use client'
import React, { useState } from 'react'
import {useRouter} from "next/router"

const UserOrderForm = () => {
    const [selectedAddress, setSelectedAddress] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    // const router = useRouter()

    const [order, setOrder] = useState({
        productName: '',
        quantity: '',
        customerName: '',
        customerEmail: '',
        customerPhone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Здесь обработка отправки формы
        console.log(order); // Выводим данные в консоль для проверки
    };

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Оформление заказа</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="productName"
                    placeholder="Название товара"
                    value={order.productName}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Количество"
                    value={order.quantity}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="customerName"
                    placeholder="Имя покупателя"
                    value={order.customerName}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    name="customerEmail"
                    placeholder="Email покупателя"
                    value={order.customerEmail}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="tel"
                    name="customerPhone"
                    placeholder="Телефон покупателя"
                    value={order.customerPhone}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Оформить заказ
                </button>
            </form>
        </div>
    );
};

export default UserOrderForm
