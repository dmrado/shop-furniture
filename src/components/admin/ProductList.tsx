'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductsList = ({products}) => {

    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        sortBy: 'newest'
    })
    const categories = [
        'Все',
        'Уютные диваны',
        'Удобные кресла',
        'Красивые столики',
        'Вместительные шкафы'
    ]

    return <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            Фильтры
            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={filters.category}
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                        >
                            {categories.map(category => (
                                <option key={category} value={category.toLowerCase()}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={filters.priceRange}
                            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                        >
                            <option value="all">Все цены</option>
                            <option value="0-100">До 100₽</option>
                            <option value="101-500">101₽ - 500₽</option>
                            <option value="501+">От 501₽</option>
                        </select>
                    </div>

                    <select
                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={filters.sortBy}
                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    >
                        <option value="newest">Сначала новые</option>
                        <option value="price-low">Сначала дешевле</option>
                        <option value="price-high">Сначала дороже</option>
                        <option value="rating">По рейтингу</option>
                    </select>
                </div>
            </div>

            {/* Сетка товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id}
                         className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md">

                        <div className="relative h-56 bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description_1}</p>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold text-gray-900">{product.old_price}₽</span>
                                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                                    <span className="text-yellow-400 mr-1">★</span>
                                    <span className="text-sm text-gray-600">{product.new_price}</span>
                                </div>
                            </div>
                            <button
                                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                В корзину
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* Пагинация */}
            <div className="mt-12 flex justify-center">
                <nav className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        Назад
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        1
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        2
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        3
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        Вперед
                    </button>
                </nav>
            </div>
        </div>
    </>
}

export default ProductsList