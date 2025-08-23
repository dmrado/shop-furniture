'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Для обновления страницы после изменений
import ProductVariantForm from '@/components/admin/ProductVariantForm'

// Импортируем Server Actions, которые будут вызываться из этого клиентского компонента
import { removeVariant as removeVariantAction } from '@/actions/removeVariantAction'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'

type ColorItem = {
    id: number
    name: string
    code: string
}

// Типы для пропсов
type ProductVariantManagerProps = {
    initialVariants: any[] // Варианты, переданные с сервера (уже сериализованные)
    productId: number // ID продукта, к которому относятся варианты
    allColors: ColorItem[]
    itemsPerPage: number
}

const ProductVariantManager = ({
    initialVariants,
    productId,
    allColors,
    itemsPerPage
}: ProductVariantManagerProps) => {
    console.log('initialVariants 3', initialVariants)
    const router = useRouter()
    // хранит текущий список вариантов на клиенте
    const [variants, setVariants] = useState(initialVariants)
    // хранит вариант, который сейчас редактируется (или null, если создается новый)
    const [editingVariant, setEditingVariant] = useState<any | null>(null)

    // Состояние для текущей страницы пагинации
    const [currentPage, setCurrentPage] = useState(1)

    // useEffect для синхронизации initialVariants с внутренним состоянием,
    // если initialVariants изменяются (например, после router.refresh() на родительской странице)
    useEffect(() => {
        setVariants(initialVariants)
    }, [initialVariants])

    // Обработчик нажатия кнопки "Редактировать"
    const handleEditClick = (variant: any) => {
        setEditingVariant(variant)
    }

    // Обработчик успешного сохранения формы (как для создания, так и для обновления)
    const handleFormSuccess = () => {
        setEditingVariant(null) // Сбрасываем редактируемый вариант (скрываем форму редактирования)
        router.refresh() // Заставляет Next.js перерендерить серверный компонент и обновить данные
    }

    // Обработчик отмены редактирования
    const handleFormCancel = () => {
        setEditingVariant(null) // Сбрасываем редактируемый вариант
    }

    // Обработчик удаления варианта
    const handleDeleteVariant = async (variantId: number) => {
        // Вызываем Server Action для удаления
        await removeVariantAction(variantId, productId) // Передаем productId для ревалидации конкретного пути
        router.refresh() // Обновляем список вариантов на странице
    }

    // Вычисляем продукты для текущей страницы
    const offset = (currentPage - 1) * itemsPerPage
    const currentItems = initialVariants.slice(offset, offset + itemsPerPage)
    const pageCount = Math.ceil(initialVariants.length / itemsPerPage)
    // Обработчик изменения страницы пагинации
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected + 1)
        // window.scrollTo({ top: 0, behavior: 'smooth' }) // Прокрутка к началу списка
    }

    return (
        <>
            <h2 className="text-xl font-bold mt-2 mb-2">Варианты продукта</h2>

            {/* Компонент пагинации */}
            {pageCount > 1 && (
                <div className="mt-2">
                    <ReactPaginateWrapper
                        pages={pageCount}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {currentItems.length === 0 ? (
                <p className="text-gray-600">
                    Для этого продукта пока нет вариантов.
                </p>
            ) : (
                <ul>
                    {currentItems.map((variant) => {
                        // Находим соответствующий объект цвета по colorId
                        const color = allColors.find(
                            (c) => c.id === variant.colorId
                        )

                        return (
                            <li key={variant.id} className="list-none mb-2">
                                <div className="flex flex-col sm:flex-row items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                                    {/* Контейнер для артикула и цвета */}
                                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                                        <span className="text-gray-700 font-medium">
                                            Артикул: {variant.articul}
                                        </span>
                                    </div>

                                    {/* Контейнер для кнопок "Редактировать" и "Удалить" */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {/* Отображаем цвет */}
                                        {color ? (
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-600 text-sm">
                                                    {color.name}
                                                </span>
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-300 mx-4"
                                                    style={{
                                                        backgroundColor:
                                                            color.code
                                                    }} // Используем HTML-код цвета
                                                    title={color.name} // Всплывающая подсказка с названием цвета
                                                ></div>
                                            </div>
                                        ) : (
                                            variant.colorId && (
                                                <span className="text-gray-600 text-sm">
                                                    (Цвет ID: {variant.colorId})
                                                </span>
                                            )
                                        )}
                                        <button
                                            onClick={() =>
                                                handleEditClick(variant)
                                            }
                                            className="button_blue px-4 py-2 text-sm w-full sm:w-auto"
                                        >
                                            {' '}
                                            Редактировать
                                        </button>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                handleDeleteVariant(variant.id)
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
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}

            {/* Заголовок формы: меняется в зависимости от режима (редактирование или создание) */}
            <h3 className="text-xl font-bold mt-8 mb-4">
                {editingVariant
                    ? `Редактировать вариант: ${editingVariant.articul}`
                    : 'Добавить новый вариант продукта'}
            </h3>

            <ProductVariantForm
                productVariant={editingVariant} // Передаем либо объект варианта, либо null
                productId={productId} // Всегда передаем ID продукта
                onSuccess={handleFormSuccess} // Передаем колбэк для успешного сохранения
                onCancel={handleFormCancel} // Передаем колбэк для отмены
            />
        </>
    )
}

export default ProductVariantManager
