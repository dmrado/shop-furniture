'use client'
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { ProductDTO } from '@/db/models/product.model.ts'
import Link from 'next/link'
import Image from 'next/image'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import { DictionaryItem } from '@/db/types/common-types'
import SearchProduct from '@/components/site/SearchProduct'
import AdminFilter from '@/components/site/navigation/AdminFilter'

// Типы для справочников
type ProductFilterAndListProps = {
    products: ProductDTO[] // УЖЕ отфильтрованные и пагинированные продукты для ТЕКУЩЕЙ страницы
    initialBrands: DictionaryItem[]
    initialCollections: DictionaryItem[]
    initialCountries: DictionaryItem[]
    initialStyles: DictionaryItem[]
    initialCategories: DictionaryItem[]
    removeProduct: (id: number) => Promise<void>
    itemsPerPage: number
    totalProductsCount: number // общее количество отфильтрованных продуктов
    currentPage: number // текущая страница, полученная от сервера
}

const ProductFilterListForm = ({
    products,
    initialBrands = [], //дефолтное значение пустой массив
    initialCollections = [],
    initialCountries = [],
    initialStyles = [],
    initialCategories = [],
    removeProduct,
    itemsPerPage,
    totalProductsCount,
    currentPage
}: ProductFilterAndListProps) => {
    console.log('initialCategories array', initialCategories)
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()

    //URL для кнопки "Поделиться"
    const currentQueryString = searchParams.toString()
    const urlForShare = currentQueryString
        ? `${path}?${currentQueryString}`
        : path

    // Состояние для редактируемого продукта (null для создания нового)
    const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(
        null
    )

    // для пагинации
    const pageCount = Math.ceil(totalProductsCount / itemsPerPage)

    const handlePageChange = (selectedPage: { selected: number }) => {
        const newPage = selectedPage.selected + 1 // ReactPaginate 0-индексирован, нам нужен 1-индексированный номер страницы
        const currentSearchParams = new URLSearchParams(searchParams)
        currentSearchParams.set('page', String(newPage)) // Устанавливаем или обновляем параметр 'page'
        console.log(
            'ProductFilterAndList - pushing new URL:',
            path + '?' + currentSearchParams.toString()
        )
        router.push(path + '?' + currentSearchParams.toString()) // Переходим на новый URL
    }

    // Функция для сброса всех фильтров
    const resetFilters = () => {
        // Создаем новый URLSearchParams из текущих для получения метода delete из URLSearchParams
        const currentParams = new URLSearchParams(searchParams)
        // Удаляем все параметры, относящиеся к фильтрам и поиску
        currentParams.delete('page')
        currentParams.delete('brand')
        currentParams.delete('collection')
        currentParams.delete('country')
        currentParams.delete('style')
        currentParams.delete('category')
        currentParams.delete('name') // Удаляем параметр поиска по названию
        currentParams.delete('articul') // Удаляем параметр поиска по артикулу
        router.push(path + '?' + currentParams.toString()) // Переходим по чистому URL
    }

    // Обработчик выбора продукта для редактирования
    const handleEditProduct = (product: ProductDTO) => {
        setEditingProduct(product)
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

    const handleShare = async () => {
        // Получаем текущий полный URL страницы
        const fullUrl = window.location.origin + urlForShare
        console.log('window.location.origin', window.location.origin)
        console.log('fullUrl', fullUrl)

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Продукты Decoro', // Заголовок, который будет отображаться
                    text: 'Посмотрите нашу продукцию с примененными фильтрами:', // Текст сообщения
                    url: fullUrl // URL, которым делимся
                })
                console.log('Контент успешно опубликован')
            } catch (error) {
                console.error('Ошибка при попытке поделиться:', error)
            }
        } else {
            // Fallback для браузеров, которые не поддерживают Web Share API
            // Вы можете скопировать URL в буфер обмена или предложить открыть в новой вкладке
            alert(
                `Ваш браузер не поддерживает Web Share API. Ссылка скопирована в буфер обмена: ${fullUrl}`
            )
            navigator.clipboard
                .writeText(fullUrl)
                .then(() => {
                    console.log('Ссылка скопирована в буфер обмена')
                })
                .catch((err) => {
                    console.error('Не удалось скопировать ссылку:', err)
                })
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            {/* Форма фильтрации */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-2">
                <h3 className="text-lg font-bold mb-2">Фильтр продуктов</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminFilter
                        brands={initialBrands}
                        collections={initialCollections}
                        countries={initialCountries}
                        styles={initialStyles}
                    />
                </div>

                {/* <-- ПОЛЕ ВВОДА ДЛЯ ПОИСКА ПО НАЗВАНИЮ И АРТИКУЛУ */}
                <h3 className="text-lg font-bold mt-4">Поиск продуктов</h3>
                <div className="md:col-span-2 lg:col-span-4 mt-2">
                    <SearchProduct
                        nameQueryKey="name" // Используем 'name' для поиска по названию продукта
                        articulQueryKey="articul" // Используем 'articul' для поиска по артикулу продукта/варианта
                        categoryQueryKey="category"
                        namePlaceholder="Поиск по названию продукта"
                        articulPlaceholder="Поиск по артикулу"
                        categoryPlaceholder="Поиск по категории"
                        debounceTime={500}
                        categoryOptions={initialCategories.map((cat) => ({
                            label: cat.name,
                            value: String(cat.id)
                        }))}
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={resetFilters}
                        className="button_blue px-4 py-2 text-sm"
                    >
                        Сбросить фильтры
                    </button>
                    <button
                        onClick={handleShare}
                        className="button_green px-4 py-2 text-sm ml-4"
                    >
                        Поделиться
                    </button>
                </div>
            </div>

            {/* Список продуктов */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4">
                    Список продуктов ({totalProductsCount})
                </h3>

                {/* Компонент пагинации */}
                {pageCount > 1 && (
                    <div className="mt-6">
                        <ReactPaginateWrapper
                            pages={pageCount} // Передаем ВЫЧИСЛЕННОЕ pageCount
                            currentPage={currentPage} // Передаем currentPage, который пришел с сервера
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

                {products.length === 0 ? (
                    <p className="text-gray-600">
                        Нет продуктов, соответствующих фильтрам.
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <li
                                key={product.id}
                                className="py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                            >
                                {/* Контейнер для миниатюры и названия */}
                                <Link
                                    href={`/product/${product.id}`}
                                    title="Перейти на страницу продукта"
                                >
                                    <div
                                        className="flex items-center gap-3 flex-grow"
                                        aria-label="Перейти на страницу продукта"
                                    >
                                        {' '}
                                        {/* flex-grow позволит ему занять доступное пространство */}
                                        {/* Миниатюра */}
                                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                            <Image
                                                width={64} // 16 * 4 = 64px
                                                height={64} // 16 * 4 = 64px
                                                src={
                                                    product.path
                                                        ? product.path
                                                        : '/spalni.png'
                                                }
                                                alt={`Картинка продукта ${product.name}`}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        {/* Название продукта */}
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 font-medium text-lg">
                                                {product.name}
                                            </span>
                                            <span className="text-gray-600 text-sm">
                                                {product.articul}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                {/* Контейнер для кнопок */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-y-1 sm:gap-x-2 flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                                    <button
                                        onClick={() =>
                                            handleEditProduct(product)
                                        }
                                        className="button_blue text-sm px-3 py-1.5 w-full justify-center"
                                    >
                                        Редактировать
                                    </button>

                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="button_green text-sm px-3 py-1.5 w-full justify-center"
                                    >
                                        Варианты
                                    </Link>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            removeProduct(product.id)
                                        }}
                                        className="w-full"
                                    >
                                        <button
                                            type="submit"
                                            className="button_red text-sm px-3 py-1.5 w-full justify-center"
                                        >
                                            Удалить
                                        </button>
                                    </form>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Форма редактирования/создания продукта */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">
                    {editingProduct
                        ? `Редактировать продукт: ${editingProduct.name}`
                        : 'Создать новый продукт'}
                </h3>
                {/*todo добавить выбор категории для продукта*/}
                <ProductForm
                    product={editingProduct} // Передаем продукт для редактирования или null для создания
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                    // Передаем справочники в ProductForm, чтобы она не делала свои запросы
                    initialBrands={initialBrands}
                    initialCollections={initialCollections}
                    initialCountries={initialCountries}
                    initialStyles={initialStyles}
                    initialCategories={initialCategories}
                />
            </div>
        </div>
    )
}

export default ProductFilterListForm
