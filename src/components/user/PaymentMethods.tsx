'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import 'react-datepicker/dist/react-datepicker.css'

const PaymentMethods = () => {
    // Существующее состояние заказа
    const [order, setOrder] = useState({
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

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">

            {/* Секция способов оплаты */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Способ оплаты</h3>
                <div className="space-y-3">
                    {paymentMethods.map(method => (
                        <div
                            key={method.id}
                            className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => setOrder(prev => ({...prev, paymentMethod: method.id}))}
                        >
                            <div className="w-12 h-8 relative mr-4">
                                <Image
                                    src={method.image}
                                    alt={method.name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-gray-500">{method.cardNumber}</p>
                            </div>
                            <input
                                type="radio"
                                checked={order.paymentMethod === method.id}
                                onChange={() => {}}
                                className="ml-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Статусы заказа */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Статус заказа</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {orderStatuses.map(status => (
                        <div                             key={status.id}
                                                         className={`p-3 rounded-lg text-sm ${
                                                             status.status === 'completed'
                                                                 ? 'bg-green-100 text-green-800'
                                                                 : status.status === 'active'
                                                                     ? 'bg-blue-100 text-blue-800'
                                                                     : 'bg-gray-100 text-gray-800'
                                                         }`}
                        >
                            <p className="font-medium">{status.title}</p>
                            <p className="text-xs mt-1 capitalize">{status.status}</p>
                        </div>
                    ))}
                </div>
            </div>
       </div>
    )
}

export default PaymentMethods






