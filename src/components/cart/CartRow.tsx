'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useCartContext } from '@/components/cart/CartContext'
import { CartRow as TCartRow } from '@/actions/cartActions'
import QuantitySelector from '@/components/site/QuantitySelector'
import Link from 'next/link'

// описывает объект с количествами товаров
// interface Quantities {
// [key: number]: number
// }

type Props = {
  cartRow: TCartRow;
};

const CartRow = ({ cartRow }: Props) => {
    const { updateQuantity, deleteCartRow, selectedItems, toggleSelection } = useCartContext()
    const [ isUpdating, setIsUpdating ] = useState(false)

    console.log('>>>> this is one product on the Cart', cartRow)

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 mx-6 gap-4 border border-gray-100 hover:border-gray-200">
            {/* Чекбокс для выбора товара */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={selectedItems.includes(cartRow.id)}
                    onChange={() => {
                        toggleSelection(cartRow.id)
                        console.log('cartRow.id', cartRow.id)
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
            </div>

            {/* Левая часть с изображением и информацией */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Изображение */}
                <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-50 bg-gradient-to-r from-gray-50 to-gray-100">
                    <Image
                        src={cartRow.product.image}
                        alt={cartRow.product.name}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Информация о продукте */}
                <div className="flex flex-col justify-between space-y-2 w-full sm:w-[400px]">
                    <div>
                        <Link href={`/products/${cartRow.product.id}`}>
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                {cartRow.product.name}
                            </h3>
                            <div className="text-sm text-gray-600 mt-1">
                                {cartRow.product.description_1}
                            </div>
                            <div className="text-sm text-gray-600">
                                {`${cartRow.product.description_2?.slice(0, 60)}${
                                    cartRow.product.description_2?.length > 60 ? '...' : ''
                                }`}
                            </div>
                        </Link>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500">
                            <span role="img" aria-label="favorite" className="text-xl">
                ❤️
                            </span>
                        </button>
                        <button
                            onClick={() => deleteCartRow(cartRow.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-red-500"
                        >
                            <span role="img" aria-label="delete" className="text-xl">
                🗑
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Правая часть с ценой и количеством */}
            <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 w-full md:w-auto">
                {/* Цена */}
                <div className="text-right">
                    <div className="text-green-600 font-bold text-lg md:text-xl">
                        {(cartRow.product.new_price * cartRow.quantity).toFixed(2)} ₽
                    </div>
                    <div className="text-gray-400 line-through text-sm">
                        {(cartRow.product.old_price * cartRow.quantity).toFixed(2)} ₽
                    </div>
                </div>

                {/* Контроль количества */}
                <div className="flex items-center gap-2">
                    <QuantitySelector
                        disabled={isUpdating}
                        count={cartRow.quantity}
                        onCountChange={async (quantity: number) => {
                            setIsUpdating(true)
                            await updateQuantity(cartRow.id, quantity)
                            setIsUpdating(false)
                        }}
                    />
                    {/*<button*/}
                    {/*  onClick={async () => {*/}
                    {/*    setIsLoading(true);*/}
                    {/*    await updateQuantity(cartRow.id, cartRow.quantity - 1);*/}
                    {/*    setIsLoading(false);*/}
                    {/*  }}*/}
                    {/*  disabled={isLoading}*/}
                    {/*  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"*/}
                    {/*>*/}
                    {/*  -*/}
                    {/*</button>*/}
                    {/*<input*/}
                    {/*  onChange={async (event) => {*/}
                    {/*    const newValue = event.target.value;*/}
                    {/*    console.log("newValue", newValue);*/}
                    {/*    //по букве сработает ретурн, по пробелу и пустой строке вернет 0 и обнулит в БД значени поэтому проверяем приведеенное к числу значение*/}
                    {/*    if (isNaN(Number(newValue))) {*/}
                    {/*      return;*/}
                    {/*    }*/}
                    {/*    setIsLoading(true);*/}
                    {/*    await updateQuantity(cartRow.id, Number(newValue));*/}

                    {/*    setIsLoading(false);*/}
                    {/*  }}*/}
                    {/*  readOnly={isLoading}*/}
                    {/*  type="text"*/}
                    {/*  value={cartRow.quantity}*/}
                    {/*  className="w-16 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"*/}
                    {/*/>*/}
                    {/*<button*/}
                    {/*  onClick={async () => {*/}
                    {/*    setIsLoading(true);*/}
                    {/*    await updateQuantity(cartRow.id, cartRow.quantity + 1);*/}
                    {/*    setIsLoading(false);*/}
                    {/*  }}*/}
                    {/*  disabled={isLoading}*/}
                    {/*  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"*/}
                    {/*>*/}
                    {/*  +*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    )
}
export default CartRow
