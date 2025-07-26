'use client'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { ProductDTO } from '@/db/models/product.model.ts'
import Link from 'next/link'
import Image from 'next/image'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import UrlParamsSelect from '@/components/ui/UrlParamsSelect'

// Типы для справочников
type DictionaryItem = {
    id: number
    name: string
}

type ProductFilterAndListProps = {
    products: ProductDTO[] // Начальный список продуктов
    initialBrands: DictionaryItem[]
    initialCollections: DictionaryItem[]
    initialCountries: DictionaryItem[]
    initialStyles: DictionaryItem[]
    removeProduct: (id: number) => Promise<void>
    itemsPerPage: number
}

const ProductFilterAndList = ({
    products,
    initialBrands = [], //дефолтное значение пустой массив
    initialCollections = [],
    initialCountries = [],
    initialStyles = [],
    removeProduct,
    itemsPerPage
}: ProductFilterAndListProps) => {
    const router = useRouter()
    const path = usePathname()
    const [ articulFilter, setArticulFilter ] = useState<string>('')

    // Состояние для отображаемых продуктов (после фильтрации)
    // const [ filteredProducts, setFilteredProducts ] = useState(products)

    // Поскольку фильтрация происходит на клиенте, пагинация также будет происходить на клиенте, по списку filteredProducts // Состояние для текущей страницы пагинации
    const [ currentPage, setCurrentPage ] = useState(1)

    // Состояние для редактируемого продукта (null для создания нового)
    const [ editingProduct, setEditingProduct ] = useState<ProductDTO | null>(
        null
    )

    // Вычисляем продукты для текущей страницы
    const offset = (currentPage - 1) * itemsPerPage
    const currentItems = products.slice(offset, offset + itemsPerPage)
    const pageCount = Math.ceil(products.length / itemsPerPage)

    // Функция для сброса всех фильтров
    const resetFilters = () => {
        router.push(path + '')
        setArticulFilter('')
    }

    // Обработчик изменения страницы пагинации
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected + 1)
        // window.scrollTo({ top: 0, behavior: 'smooth' }) // Прокрутка к началу списка
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
                            value={articulFilter}
                            onChange={(e) => setArticulFilter(e.target.value)}
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
                    {/*<button*/}
                    {/*    onClick={handleCreateNewProduct}*/}
                    {/*    className="button_green px-4 py-2 text-sm ml-4" // Предполагается, что button_green существует*/}
                    {/*>*/}
                    {/*    Создать новый продукт*/}
                    {/*</button>*/}
                </div>
            </div>

            {/* Список продуктов */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4">
                    Список продуктов ({products.length})
                </h3>

                {/* Компонент пагинации */}
                {pageCount > 1 && (
                    <div className="mt-6">
                        <ReactPaginateWrapper
                            pages={pageCount}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

                {currentItems.length === 0 ? (
                    <p className="text-gray-600">
                        Нет продуктов, соответствующих фильтрам.
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {currentItems.map((product) => (
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
