'use client'
import React, { useState } from 'react'
import CartTotalAmount from '../cart/CartTotalAmount'

const FiltersCategories = () => {
    const [ filters, setFilters ] = useState({
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
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
                            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
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
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    >
                        <option value="newest">Сначала новые</option>
                        <option value="price-low">Сначала дешевле</option>
                        <option value="price-high">Сначала дороже</option>
                        <option value="rating">По рейтингу</option>
                    </select>
                </div>
            </div>
        </div>
    </>
}

export default FiltersCategories