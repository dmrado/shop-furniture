'use client'
import React from 'react'
import Image from 'next/image'

type User = {
    name: string;
    email: string;
    userAddress: {
        fullName: string;
        street: string;
        city: string;
        postalCode: string;
        phoneNumber: string;
    }
}

type CartItem = {
    id: number;
    title: string;
    description: string;
    sku: string;
    price: number;
    image: string;
}

type PreviousOrderItem = {
    id: number;
    title: string;
    image: string;
}

type UserDashboardProps = {
    user: User;
    cartItems: CartItem[];
    previousOrders: PreviousOrderItem[];
}

const UserOrdersHistory: React.FC<UserDashboardProps> = ({ user, previousOrders }) => {

    // const totalAmount = previousOrders.reduce((acc, products) => acc + products.price, 0);

    return (
        <div className="p-8 max-w-6xl">

            {/* Рендер миниатюр предыдущих заказов */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Предыдущие заказы</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previousOrders.map((order) => (
                    <div key={order.id} className="bg-white p-2 rounded-lg shadow-md">
                        <div className="relative w-full h-24">
                            <Image
                                layout="fill"
                                objectFit="cover"
                                src={order.image}
                                alt={order.title}
                                className="rounded-md"
                            />
                        </div>
                        <h3 className="text-sm font-semibold mt-2">{order.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserOrdersHistory
