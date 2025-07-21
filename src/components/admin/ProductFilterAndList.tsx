'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm' // Будет использоваться для редактирования/создания
import { ProductDTO } from '@/db/models/product.model.ts' // Для типизации, если нужна более строгая

// Типы для справочников
type DictionaryItem = {
    id: number;
    name: string;
};

type ProductFilterAndListProps = {
    initialProducts: any[]; // Начальный список продуктов
    initialBrands: DictionaryItem[];
    initialCollections: DictionaryItem[];
    initialCountries: DictionaryItem[];
    initialStyles: DictionaryItem[];
};

const ProductFilterAndList = ({
    initialProducts,
    initialBrands = [], //Добавляем дефолтное значение пустой массив
    initialCollections = [],
    initialCountries = [],
    initialStyles = [],
}: ProductFilterAndListProps) => {
    const router = useRouter()

    // Состояния для фильтров
    const [ brandFilter, setBrandFilter ] = useState<number | ''>('')
    const [ collectionFilter, setCollectionFilter ] = useState<number | ''>('')
    const [ countryFilter, setCountryFilter ] = useState<number | ''>('')
    const [ styleFilter, setStyleFilter ] = useState<number | ''>('')

    // Состояние для отображаемых продуктов (после фильтрации)
    const [ filteredProducts, setFilteredProducts ] = useState(initialProducts)

    // Состояние для редактируемого продукта (null для создания нового)
    const [ editingProduct, setEditingProduct ] = useState<any | null>(null)

    // Эффект для применения фильтров при изменении начальных продуктов или самих фильтров
    useEffect(() => {
        let currentProducts = initialProducts

        if (brandFilter) {
            currentProducts = currentProducts.filter(p => p.brandId === brandFilter)
        }
        if (collectionFilter) {
            currentProducts = currentProducts.filter(p => p.collectionId === collectionFilter)
        }
        if (countryFilter) {
            currentProducts = currentProducts.filter(p => p.countryId === countryFilter)
        }
        if (styleFilter) {
            currentProducts = currentProducts.filter(p => p.styleId === styleFilter)
        }

        setFilteredProducts(currentProducts)
    }, [ initialProducts, brandFilter, collectionFilter, countryFilter, styleFilter ])

    // Функция для сброса всех фильтров
    const resetFilters = () => {
        setBrandFilter('')
        setCollectionFilter('')
        setCountryFilter('')
        setStyleFilter('')
    }

    // Обработчик выбора продукта для редактирования
    const handleEditProduct = (product: any) => {
        setEditingProduct(product)
    }

    // Обработчик для создания нового продукта
    const handleCreateNewProduct = () => {
        setEditingProduct(null) // Передаем null, чтобы ProductForm знал, что это новый продукт
    }

    // Обработчик успешного сохранения формы (из ProductForm)
    const handleFormSuccess = () => {
        setEditingProduct(null) // Скрываем форму редактирования/создания
        router.refresh() // Перезагружаем данные на странице через Server Component
    }

    // Обработчик отмены редактирования/создания
    const handleFormCancel = () => {
        setEditingProduct(null) // Скрываем форму
    }

    // Вспомогательная функция для рендеринга опций select
    const renderFilterOptions = (items: DictionaryItem[], placeholder: string) => (
        <>
            <option value="">{placeholder}</option>
            {items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
        </>
    )

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Форма фильтрации */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4">Фильтр продуктов</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="brandFilter" className="block text-gray-700 text-sm font-bold mb-2">Бренд:</label>
                        <select
                            id="brandFilter"
                            value={brandFilter}
                            onChange={(e) => setBrandFilter(Number(e.target.value) || '')}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {renderFilterOptions(initialBrands, 'Все бренды')}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="collectionFilter" className="block text-gray-700 text-sm font-bold mb-2">Коллекция:</label>
                        <select
                            id="collectionFilter"
                            value={collectionFilter}
                            onChange={(e) => setCollectionFilter(Number(e.target.value) || '')}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {renderFilterOptions(initialCollections, 'Все коллекции')}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="countryFilter" className="block text-gray-700 text-sm font-bold mb-2">Страна:</label>
                        <select
                            id="countryFilter"
                            value={countryFilter}
                            onChange={(e) => setCountryFilter(Number(e.target.value) || '')}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {renderFilterOptions(initialCountries, 'Все страны')}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="styleFilter" className="block text-gray-700 text-sm font-bold mb-2">Стиль:</label>
                        <select
                            id="styleFilter"
                            value={styleFilter}
                            onChange={(e) => setStyleFilter(Number(e.target.value) || '')}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {renderFilterOptions(initialStyles, 'Все стили')}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={resetFilters}
                        className="button_blue px-4 py-2 text-sm"
                    >
                        Сбросить фильтры
                    </button>
                    <button
                        onClick={handleCreateNewProduct}
                        className="button_green px-4 py-2 text-sm ml-4" // Предполагается, что button_green существует
                    >
                        Создать новый продукт
                    </button>
                </div>
            </div>

            {/* Список продуктов */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4">Список продуктов ({filteredProducts.length})</h3>
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-600">Нет продуктов, соответствующих фильтрам.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {filteredProducts.map(product => (
                            <li key={product.id} className="py-3 flex items-center justify-between">
                                <span className="text-gray-800 font-medium">{product.name}</span>
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="button_blue px-3 py-1 text-sm"
                                >
                                    Редактировать
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Форма редактирования/создания продукта */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">
                    {editingProduct ? `Редактировать продукт: ${editingProduct.name}` : 'Создать новый продукт'}
                </h3>
                <ProductForm
                    product={editingProduct} // Передаем продукт для редактирования или null для создания
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                    // Передаем справочники в ProductForm, чтобы она не делала свои запросы
                    initialBrands={initialBrands}
                    initialCollections={initialCollections}
                    initialCountries={initialCountries}
                    initialStyles={initialStyles}
                />
            </div>
        </div>
    )
}

export default ProductFilterAndList