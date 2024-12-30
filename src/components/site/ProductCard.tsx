'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// todo: remove this to cart context
import { putProductToCartAction } from '@/actions/productActions'
import { useUserCartContext } from '@/components/user/UserCartContext'

type Props = {
    product: {
        id: number,
        isNew: boolean,
        image: string,
        name: string,
        category: string,
        description_1: string,
        old_price: number,
        new_price: number,
    }
}

const ProductCard = ({ product }: Props) => {
    const { } = useUserCartContext()
    const [ isHovered, setIsHovered ] = useState(false)
    const discount = (1 - product.new_price / product.old_price) * 100

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-100"
        >
            <p>Discount: {discount}</p>
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-50">
                <div className="absolute top-3 right-3 z-10 space-y-2">
                    {product.isNew && (
                        <span className="block px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-full">
                            Новинка
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="block px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                            -{discount.toFixed()}%
                        </span>
                    )}
                </div>

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover transform transition-transform duration-700 ${
                        isHovered ? 'scale-110' : 'scale-100'
                    }`}
                    priority
                />

                <div className={`absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}/>
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Category */}
                <div className="text-xs font-medium text-indigo-600 mb-2">
                    Category: {product.category}
                </div>

                {/* Title */}
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description_1}
                    </p>
                </Link>
                {/* Price and Rating */}
                <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                        <div className="text-2xl font-bold text-gray-900">
                            {product.new_price}₽
                        </div>
                        {product.old_price > product.new_price && (
                            <div className="text-sm text-gray-500 line-through">
                                {product.old_price}₽
                            </div>
                        )}
                    </div>

                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                        <span className="text-yellow-400 mr-1.5">★</span>
                        <span className="text-sm font-medium text-gray-700">
                            {/*todo заменить на рейтинг, в БД пока нет*/}
                            {product.old_price}
                        </span>
                    </div>
                </div>
                {/*todo серверный экшен по онклику на добавление товара в модель CartModel*/}
                <button
                    onClick={() => {
                        console.log('product.id front', product.id)
                        // todo: use cart context for this
                        putProductToCartAction(product.id)}
                    }
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium
                    transition-all duration-300 transform
                    hover:bg-indigo-700 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    active:scale-[0.98]">
                    В корзину
                </button>
            </div>
        </div>
    )
}

export default ProductCard
