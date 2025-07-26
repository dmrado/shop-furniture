'use client'
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { ProductDTO } from '@/db/models/product.model.ts'
import Link from 'next/link'
import Image from 'next/image'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import UrlParamsSelect from '@/components/ui/UrlParamsSelect'
import { DictionaryItem } from '@/db/types/common-types'

// Типы для справочников
type ProductFilterAndListProps = {
    products: ProductDTO[] // УЖЕ отфильтрованные и пагинированные продукты для ТЕКУЩЕЙ страницы
    initialBrands: DictionaryItem[]
    initialCollections: DictionaryItem[]
    initialCountries: DictionaryItem[]
    initialStyles: DictionaryItem[]
    removeProduct: (id: number) => Promise<void>
    itemsPerPage: number,
    totalProductsCount: number, // общее количество отфильтрованных продуктов
    currentPage: number // текущая страница, полученная от сервера
}

const ProductFilterAndList = ({
    products,
    initialBrands = [], //дефолтное значение пустой массив
    initialCollections = [],
    initialCountries = [],
    initialStyles = [],
    removeProduct,
    itemsPerPage,
    totalProductsCount,
    currentPage,
}: ProductFilterAndListProps) => {
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const articulFilterFromUrl = searchParams.get('articul') || ''

    //URL для кнопки "Поделиться"
    const currentQueryString = searchParams.toString()
    const urlForShare = currentQueryString ? `${path}?${currentQueryString}` : path
    console.log('currentQueryString', currentQueryString)
    console.log('urlForShare', urlForShare)

    // Состояние для редактируемого продукта (null для создания нового)
    const [ editingProduct, setEditingProduct ] = useState<ProductDTO | null>(
        null
    )

    // для пагинации
    const pageCount = Math.ceil(totalProductsCount / itemsPerPage)

    // --- Обработчики фильтров (без изменений, они уже меняют URL) ---
    const handleArticulChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newArticul = e.target.value
        const currentSearchParams = new URLSearchParams(searchParams.toString())
        console.log('currentSearchParams', currentSearchParams)
        if (newArticul) {
            currentSearchParams.set('articul', newArticul)
        } else {
            currentSearchParams.delete('articul')
        }
        currentSearchParams.delete('page') // Сбрасываем на первую страницу при изменении артикула
        router.push(path + '?' + currentSearchParams.toString())
    }

    const handlePageChange = (selectedPage: { selected: number }) => {
        const newPage = selectedPage.selected + 1 // ReactPaginate 0-индексирован, нам нужен 1-индексированный номер страницы
        const currentSearchParams = new URLSearchParams(searchParams)
        currentSearchParams.set('page', String(newPage)) // Устанавливаем или обновляем параметр 'page'
        router.push(path + '?' + currentSearchParams.toString()) // Переходим на новый URL
    }

    // Функция для сброса всех фильтров
    const resetFilters = () => {
        router.push(path)
    }

    // Обработчик выбора продукта для редактирования
    const handleEditProduct = (product: ProductDTO) => {
        setEditingProduct(product)
    }

    // Обработчик для создания нового продукта кнопка на котроой он висит по-моему не требуется? проверить и удалить
    // const handleCreateNewProduct = () => {
    //     setEditingProduct(null) // Передаем null, чтобы ProductForm знал, что это новый продукт
    // }

    // Обработчик успешного сохранения формы (из ProductForm)
    const handleFormSuccess = () => {
        setEditingProduct(null) // Скрываем форму редактирования/создания
        router.refresh() // Перезагружаем данные на странице через Server Component
    }

    // Обработчик отмены редактирования/создания
    const handleFormCancel = () => {
        setEditingProduct(null) // Скрываем форму
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Форма фильтрации */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-2">
                <h3 className="text-lg font-bold mb-2">Фильтр продуктов</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <UrlParamsSelect
                        label={'Бренд'}
                        options={initialBrands.map((brand) => ({
                            value: String(brand.id),
                            label: brand.name
                        }))}
                        queryKey={'brand'}
                        placeHolder={'Все бренды'}
                    />

                    <UrlParamsSelect
                        label={'Коллекция'}
                        options={initialCollections.map((brand) => ({
                            value: String(brand.id),
                            label: brand.name
                        }))}
                        queryKey={'collection'}
                        placeHolder={'Все коллекции'}
                    />

                    <UrlParamsSelect
                        label={'Страна'}
                        options={initialCountries.map((brand) => ({
                            value: String(brand.id),
                            label: brand.name
                        }))}
                        queryKey={'country'}
                        placeHolder={'Все страны'}
                    />

                    <UrlParamsSelect
                        label={'Стиль'}
                        options={initialStyles.map((brand) => ({
                            value: String(brand.id),
                            label: brand.name
                        }))}
                        queryKey={'style'}
                        placeHolder={'Все стили'}
                    />

                    {/* <-- ПОЛЕ ВВОДА ДЛЯ ПОИСКА ПО АРТИКУЛУ */}
                    <div className="md:col-span-2 lg:col-span-1">
                        {' '}
                        {/* Растягиваем на 2 колонки на md, на 1 на lg */}
                        <label
                            htmlFor="articulSearch"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Поиск по артикулу:
                        </label>
                        <input
                            type="text"
                            id="articulSearch"
                            value={articulFilterFromUrl}
                            onChange={handleArticulChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Введите артикул"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={resetFilters}
                        className="button_blue px-4 py-2 text-sm"
                    >
                        Сбросить фильтры
                    </button>
                    <Link href={urlForShare}
                        className="button_green px-4 py-2 text-sm ml-4"
                    >
                        Поделиться
                    </Link>
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
                                className="py-3 flex items-center justify-between"
                            >
                                {/* Контейнер для миниатюры и названия */}
                                <div className="flex items-center gap-4 flex-grow">
                                    {' '}
                                    {/* flex-grow позволит ему занять доступное пространство */}
                                    {/* Миниатюра */}
                                    <div
                                        className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200">
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
                                    <span className="text-gray-800 font-medium text-lg">
                                        {product.name}
                                    </span>
                                </div>

                                {/* Контейнер для кнопок */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() =>
                                            handleEditProduct(product)
                                        }
                                        className="button_blue px-3 py-1 text-sm"
                                    >
                                        Редактировать
                                    </button>

                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="button_green px-3 py-1 text-sm"
                                    >
                                        Варианты
                                    </Link>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            removeProduct(product.id)
                                        }}
                                        className="w-full sm:w-auto"
                                    >
                                        <button
                                            type="submit"
                                            className="button_red px-4 py-2 text-sm w-full"
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
                <h3 className="text-lg font-bold mb-4">
                    {editingProduct
                        ? `Редактировать продукт: ${editingProduct.name}`
                        : 'Создать новый продукт'}
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
