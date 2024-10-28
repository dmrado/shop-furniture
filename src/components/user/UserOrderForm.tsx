'use client'
import React, { useState } from 'react'
import { useRouter } from "next/router"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//todo получение адресов доставки или на странице profile выбор тоглером са передачей адреса сразу в форму ИЛИ ВООБЩЕ СДЕЛАТЬ ЗАКАЗ НА СТРАНИЦЕ DASHBOARD отметить "чекед" выбранные заказы, посчитать по ним сумму выбрать адрес, дату и время и отпроавить на email службы доставки.
const UserOrderForm = () => {
    const [order, setOrder] = useState({
        productName: '',
        quantity: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        deliveryDate: null,
        deliveryAddress: '' // Добавлено состояние для адреса доставки
    });

    const addresses = [
        'Улица 1, дом 1',
        'Улица 2, дом 2',
        'Улица 3, дом 3',
        // Добавьте другие адреса по необходимости
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setOrder(prevState => ({
            ...prevState,
            deliveryDate: date
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
                <div className="mb-4">
                    <label className="block mb-1">Адрес доставки:</label>
                    <select
                        name="deliveryAddress"
                        value={order.deliveryAddress}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Выберите адрес</option>
                        {addresses.map((address, index) => (
                            <option key={index} value={address}>{address}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Дата и время доставки:</label>
                    <DatePicker
                        selected={order.deliveryDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholderText="Выберите дату и время"
                        required
                    />
                </div>
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

