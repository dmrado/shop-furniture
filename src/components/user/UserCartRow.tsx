'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cartProductDelete, updateQuantityAction } from '@/actions/user/cartProductQuantity'
import { useUserCartContext } from '@/components/user/UserCartContext'

interface CartProduct {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    discount: number;
    product: {
        id: number;
        isActive: boolean;
        articul: string;
        sku: string;
        name: string;
        description_1: string;
        description_2: string;
        length: number;
        width: number;
        height: number;
        weight: number;
        box_length: number;
        box_height: number;
        box_weight: number;
        image: string;
        old_price: number;
        new_price: number;
        primary_color: number;
        secondary_color: number;
        inStock: boolean;
    } | null;

}

// описывает объект с количествами товаров
// interface Quantities {
// [key: number]: number
// }

interface UserCartProps {
    cartItem: CartProduct;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

interface CartItem {
    id: number
    product: {
        new_price: number
        old_price: number
    }
    quantity: number
}

const UserCartRow = ({ cartItem, isSelected, onSelect, initialQuantity }: any) => {
    // const [quantity, setQuantity] = useState<number>(cartItem.quantity)
    const { updateQuantity } = useUserCartContext()
    const [ isLoading, setIsLoading ] = useState(false)

    console.log('>>>> this is one product on UserCart', cartItem)

    return <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 mx-6 gap-4 border border-gray-100 hover:border-gray-200">

        {/* Чекбокс для выбора товара */}
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(cartItem.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
        </div>

        {/* Левая часть с изображением и информацией */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Изображение */}
            <div
                className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-50 bg-gradient-to-r from-gray-50 to-gray-100">
                <Image
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Информация о продукте */}
            <div className="flex flex-col justify-between space-y-2 w-full sm:w-[400px]">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        {cartItem.product.name}
                    </h3>
                    <div className="text-sm text-gray-600 mt-1">
                        {cartItem.product.description_1}
                    </div>
                    <div className="text-sm text-gray-600">
                        {cartItem.product.description_2}
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500">
                        <span role="img" aria-label="favorite" className="text-xl">❤️</span>
                    </button>
                    <button
                        onClick={() => cartProductDelete(cartItem.product.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500">
                        <span role="img" aria-label="delete" className="text-xl">🗑</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Правая часть с ценой и количеством */}
        <div
            className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 w-full md:w-auto">
            {/* Цена */}
            <div className="text-right">
                <div className="text-green-600 font-bold text-lg md:text-xl">
                    {cartItem.product.new_price} ₽
                </div>
                <div className="text-gray-400 line-through text-sm">
                    {cartItem.product.old_price} ₽
                </div>
            </div>

            {/* Контроль количества */}
            <div className="flex items-center gap-2">
                <button
                    onClick={async () => {
                        setIsLoading(true)
                        await updateQuantity(cartItem.id, cartItem.quantity - 1)
                        setIsLoading(false)
                    }}
                    disabled={isLoading}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    -
                </button>
                <input
                    onChange={async (event) => {
                        const newValue = event.target.value
                        console.log('newValue', newValue)
                        //по букве сработает ретурн, по пробелу и пустой строке вернет 0 и обнулит в БД значени поэтому проверяем приведеенное к числу значение
                        if (isNaN(Number(newValue))) {
                            return
                        }
                        setIsLoading(true)
                        await updateQuantity(cartItem.id, Number(newValue))

                        setIsLoading(false)
                    }}
                    readOnly={isLoading}
                    type="text"
                    value={cartItem.quantity}
                    className="w-16 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                    onClick={async () => {
                        setIsLoading(true)
                        await updateQuantity(cartItem.id, cartItem.quantity + 1)
                        setIsLoading(false)
                    }}
                    disabled={isLoading}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    +
                </button>
            </div>
        </div>
    </div>

}
export default UserCartRow
