'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import 'react-datepicker/dist/react-datepicker.css'

const PaymentMethods = () => {
    // Существующее состояние заказа
    const [ order, setOrder ] = useState({
        productName: '',
        quantity: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        deliveryDate: null,
        deliveryAddress: '',
        paymentMethod: '' // Добавлено поле для способа оплаты
    })

    // Имитация данных о способах оплаты из БД
    const paymentMethods = [
        {
            id: 1,
            name: 'MIR',
            cardNumber: '****3456',
            image: '/mir.png'
        },
        {
            id: 2,
            name: 'MasterCard',
            cardNumber: '****8901',
            image: '/mastercard.png'
        },
        {
            id: 3,
            name: 'Visa',
            cardNumber: '****4567',
            image: '/visa-card.png'
        },
        {
            id: 4,
            name: 'Visa',
            cardNumber: '****2212',
            image: '/visa-card.png'
        },
        {
            id: 5,
            name: 'Visa',
            cardNumber: '****9939',
            image: '/visa-card.png'
        },
        {
            id: 5,
            name: 'MIR',
            cardNumber: '****6113',
            image: '/mir.png'
        },
        {
            id: 5,
            name: 'MIR',
            cardNumber: '****4772',
            image: '/mir.png'
        }
    ]

    // Статусы заказа
    const orderStatuses = [
        { id: 1, title: 'Lorem ipsum dolor si', status: 'completed' },
        { id: 2, title: 'Consectetur adipisci', status: 'active' },
        { id: 3, title: 'Sed do eiusmod temp', status: 'pending' },
        { id: 4, title: 'Ut labore et dolore', status: 'pending' },
        { id: 5, title: 'Magna aliqua ut eni', status: 'pending' },
        { id: 6, title: 'Quis nostrud exerci', status: 'pending' },
        { id: 7, title: 'Ullamco laboris nis', status: 'pending' },
        { id: 8, title: 'Duis aute irure dol', status: 'pending' },
        { id: 9, title: 'Reprehenderit in vo', status: 'pending' },
        { id: 10, title: 'Excepteur sint occ', status: 'pending' }
    ]

    // Существующие обработчики...

    return (<>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">

            {/* Секция способов оплаты */}
            <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Ваши платежные инструменты</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {paymentMethods.map(method => (
                        <div
                            key={method.id}
                            className="flex items-center p-3 sm:p-4 lg:p-6 border rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => setOrder(prev => ({ ...prev, paymentMethod: method.id }))}
                        >
                            <div className="w-10 sm:w-16 lg:w-24 h-10 sm:h-14 lg:h-20 relative mr-3 sm:mr-4 lg:mr-6">
                                <Image
                                    src={method.image}
                                    alt={method.name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base font-medium">{method.name}</p>
                                <p className="text-xs sm:text-sm text-gray-500">{method.cardNumber}</p>
                            </div>
                            <input
                                type="radio"
                                checked={order.paymentMethod === method.id}
                                onChange={() => {
                                }}
                                className="ml-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="my-6">
            <h3 className="text-lg font-semibold mb-3">Статус заказа</h3>
            <div className="flex flex-wrap gap-4 justify-between">
                {orderStatuses.map((status, index) => (
                    <div key={status.id}
                        className={`p - 4 rounded-lg flex-1 min-w-[200px] ${index >= 6 ? 'mt-4' : ''} ${
                            status.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : status.status === 'active'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                        } ${
                            index < orderStatuses.length - 1
                                ? 'clip-path-arrow'
                                : ''
                        }`}
                    >
                        <div>
                            <p className="font-medium">{status.title}</p>
                            <p className="text-xs mt-1 capitalize">{status.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}

export default PaymentMethods
