'use client'
import Image from 'next/image'
import Link from "next/link"
import { useState } from 'react'

// todo компонент тьребует передать ему вес товара

//  описывает структуру товара
interface CartItem {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    sku: string;
    weight: number;
    discount?: number;
    promoDiscount?: number;
}

// описывает объект с количествами товаров
interface Quantities {
    [key: number]: number;
}

// описывает пропсы компонента
interface UserCartProps {
    cartItems: CartItem[];
}

const UserCart: React.FC<UserCartProps> = ({cartItems}) => {
    const [quantities, setQuantities] = useState<Quantities>(
        cartItems.reduce((acc, item) => ({...acc, [item.id]: 1}), {})
    )

    const calculateItemTotal = (item: CartItem): number => {
        const quantity = quantities[item.id];
        const discount = item.discount || 0;
        const priceWithDiscount = item.price * (1 - discount / 100);
        return priceWithDiscount * quantity;
    };

    const calculateTotalItems = (): number => {
        return Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0);
    };

    const calculateTotalWeight = (): number => {
        return cartItems.reduce((acc, item) => {
            const itemWeight = item.weight || 0;
            return acc + (itemWeight * quantities[item.id]);
        }, 0);
    };

    const totalDiscount: number = cartItems.reduce((acc, item) => {
        const quantity = quantities[item.id];
        const itemDiscount = (item.discount || 0) * item.price * quantity / 100;
        return acc + itemDiscount;
    }, 0);

    const promoCodeDiscount: number = cartItems[0]?.promoDiscount || 0;

    const subtotal: number = cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
    const totalAmount: number = subtotal - promoCodeDiscount;
    const totalItems: number = calculateTotalItems();
    const totalWeight: number = calculateTotalWeight();

    const handleQuantityChange = (id: number, value: number): void => {
        const newValue = Math.max(0, Math.min(300, value));
        setQuantities(prev => ({...prev, [id]: newValue}));
    }

    const formatWeight = (weight: number): string => {
        if (weight >= 1000) {
            return `${(weight / 1000).toFixed(2)} кг`
        }
        return `${weight} г`
    };

    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Корзина</h1>
            <h2 className="text-xl font-semibold mb-4">Выбранные товары</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="relative w-full h-40 mb-4">
                            <Image
                                className="hidden md:block rounded-md"
                                layout="fill"
                                objectFit="cover"
                                src={item.image}
                                alt={item.title}
                            />
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                        <p className="text-sm text-gray-400">Арт: {item.sku}</p>
                        <p className="text-sm text-gray-400">Вес: {formatWeight(item.weight)}</p>
                        {item.discount > 0 && (
                            <p className="text-red-500">Скидка: {item.discount}%</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                            <input
                                type="number"
                                min="0"
                                max="300"
                                value={quantities[item.id]}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                className="w-20 p-1 border rounded"
                            />
                            <p className="text-xl font-bold">
                                `${(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}`
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Корзина */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Корзина</h2>
                    <Link href={'/order'}>
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 h-10 flex-shrink-0">
                            Оформить заказ
                        </button>
                    </Link>
                </div>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Корзина пуста.</p>
                ) : (
                    <>
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Всего товаров:</span>
                                <span className="font-medium">{totalItems} шт.</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Общий вес:</span>
                                <span className="font-medium">{formatWeight(totalWeight)}</span>
                            </div>
                        </div>
                        <ul className="mb-4 border-t border-gray-200 pt-4">
                            {cartItems.map((item: CartItem) => (
                                <li key={item.id} className="flex justify-between mb-3 py-2 border-b border-gray-200">
                                    <span className="text-gray-800">
                                        {item.title} (x{quantities[item.id]})
                                    </span>
                                    <div className="text-right">
                                        <span className="text-gray-600">
                                            `${calculateItemTotal(item).toFixed(2)}`
                                        </span>
                                        <br />
                                        <span className="text-sm text-gray-400">
                                            {formatWeight(item.weight * quantities[item.id])}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Сумма скидок по товарам:</span>
                                <span>-`${totalDiscount.toFixed(2)}`</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Скидка по промокоду:</span>
                                <span>-`${promoCodeDiscount.toFixed(2)}`</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl text-gray-800 pt-2 border-t">
                                <span>Итого:</span>
                                <span>`${totalAmount.toFixed(2)}`</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default UserCart
