'use client'
import Image from 'next/image'
import Link from "next/link"
import {useState} from 'react'
import {incrementQuantity, decrementQuantity, cartProductDelete} from '@/actions/user/cartProductQuantity'

interface cartProducts {
    id: number;
    isActive: number;
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
    old_price: number;
    new_price: number;
    primary_color: number;
    secondary_color: number;
    inStock: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    discount: number;
    promoDiscount: number;
}

// описывает объект с количествами товаров
interface Quantities {
    [key: number]: number
}

// описывает пропсы компонента
interface UserCartProps {
    cartItems: cartProducts[]
}

const UserCart = ({product}: UserCartProps) => {
    //todo initialState должен быть текущее значение из БД
    // const [quantity, setQuantity] = useState(orderedProductQuantity?.quantity || 0)
    const [quantity, setQuantity] = useState(product.quantity || 0)




    // const [quantities, setQuantities] = useState<Quantities>(
    //     product.reduce((acc, item) => ({...acc, [item.id]: 1}), {})
    // )
    console.log('>>>> this is one product on UserCart', product)
    // const calculateItemTotal = (item: cartProducts): number => {
    //     const quantity = quantities[item.id];
    //     const discount = item.discount || 0;
    //     const priceWithDiscount = item.new_price * (1 - discount / 100);
    //     return priceWithDiscount * quantity;
    // };
    //
    // const calculateTotalItems = (): number => {
    //     return Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0);
    // };
    //
    // const calculateTotalWeight = (): number => {
    //     return cartProducts.reduce((acc, item) => {
    //         const itemWeight = item.weight || 0;
    //         return acc + (itemWeight * quantities[item.id]);
    //     }, 0);
    // };

    // const totalDiscount: number = cartProducts.reduce((acc, item) => {
    //     const quantity = quantities[item.id];
    //     const itemDiscount = (item.discount || 0) * item.new_price * quantity / 100;
    //     return acc + itemDiscount;
    // }, 0);

    // const promoCodeDiscount: number = cartProducts[0]?.promoDiscount || 0;
    //
    // const subtotal: number = cartProducts.reduce((acc, item) => acc + calculateItemTotal(item), 0);
    // const totalAmount: number = subtotal - promoCodeDiscount;
    // const totalItems: number = calculateTotalItems();
    // const totalWeight: number = calculateTotalWeight();
    //
    // const handleQuantityChange = (id: number, value: number): void => {
    //     const newValue = Math.max(0, Math.min(300, value));
    //     setQuantities(prev => ({...prev, [id]: newValue}));
    // }


    return <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 mx-6 gap-4 border border-gray-100 hover:border-gray-200">
        {/* Левая часть с изображением и информацией */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Изображение */}
            <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-50 bg-gradient-to-r from-gray-50 to-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Информация о продукте */}
            <div className="flex flex-col justify-between space-y-2">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                    </h3>
                    <div className="text-sm text-gray-600 mt-1">
                        {product.description_1}
                    </div>
                    <div className="text-sm text-gray-600">
                        {product.description_2}
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500">
                        <span role="img" aria-label="favorite" className="text-xl">❤️</span>
                    </button>
                    <button
                        onClick={() => cartProductDelete(product.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500">
                        <span role="img" aria-label="delete" className="text-xl">🗑</span>
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 text-sm font-medium  transform hover:scale-105 active:scale-95">
                        Купить
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
                    {product.new_price} ₽
                </div>
                <div className="text-gray-400 line-through text-sm">
                    {product.old_price} ₽
                </div>
            </div>

            {/* Контроль количества */}
            <div className="flex items-center gap-2">
                <button
                    onClick={async () => {
                        const updatedQuantity = await decrementQuantity(product.id)
                        setQuantity(updatedQuantity)
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600">
                    -
                </button>
                <input
                    type="text"
                    defaultValue={quantity}
                    className="w-16 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                    onClick={async () => {
                        const updatedQuantity = await incrementQuantity(product.id)
                        setQuantity(updatedQuantity)
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 ">
                    +
                </button>
            </div>
        </div>
    </div>

}
export default UserCart
