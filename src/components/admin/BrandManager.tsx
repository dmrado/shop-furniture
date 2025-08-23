'use client'

import React, { useState } from 'react'
import { DictionaryItem } from '@/db/types/common-types'
import {
    createBrand,
    getAllBrands,
    softDeleteBrand,
    updateBrand
} from '@/actions/dictionaryActions'
import Modal from '@/components/ui/Modal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation' // Для router.refresh()
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import Link from 'next/link'

// Пропсы для компонента
type BrandManagementClientProps = {
    initialBrands: DictionaryItem[]
    itemsPerPage: number
    currentPage: number
    totalCount: number //  для пагинации
}

// Интерфейс для формы бренда
interface BrandFormState {
    id?: number | null
    name: string
    description: string
    isActive?: boolean
}

const BrandManager = ({
    initialBrands,
    itemsPerPage,
    currentPage,
    totalCount
}: BrandManagementClientProps) => {
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()

    const [brands, setBrands] = useState<DictionaryItem[]>(initialBrands) // Состояние для брендов
    const [showModal, setShowModal] = useState(false) // Состояние для модального окна
    const [currentBrand, setCurrentBrand] = useState<BrandFormState | null>(
        null
    ) // Для редактирования/создания
    const [isActive, setIsActive] = useState(true)
    //для подсчета символов в description
    const [descriptionCharCount, setDescriptionCharCount] = useState(0)

    // для пагинации
    const pageCount = Math.ceil(totalCount / itemsPerPage)

    // Для модального окна подтверждения удаления
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [brandToDelete, setBrandToDelete] = useState<DictionaryItem | null>(
        null
    )

    // Функция для обновления счетчика символов при изменении textarea
    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescriptionCharCount(e.target.value.length)
    }

    const handleEditClick = (brand: DictionaryItem) => {
        const desc = brand.description || ''
        setCurrentBrand({
            id: brand.id,
            name: brand.name,
            description: desc,
            isActive: brand.isActive ?? true
        })
        setIsActive(brand.isActive ?? true)
        setDescriptionCharCount(desc.length) // Устанавливаем начальное значение счетчика
        setShowModal(true)
    }

    // При создании нового бренда или закрытии модалки, сбрасываем счетчик
    const handleAddClick = () => {
        setCurrentBrand(null)
        setIsActive(true) // Для нового бренда по умолчанию активен
        setDescriptionCharCount(0) // Сбрасываем счетчик
        setShowModal(true)
    }

    // Обработчик отправки формы (создание/обновление)
    const handleSubmit = async (formData: FormData) => {
        try {
            if (currentBrand?.id) {
                await updateBrand(formData) // Если есть id, это редактирование
            } else {
                await createBrand(formData) // Иначе, это создание
            }
            setShowModal(false) // Закрываем модальное окно
            setDescriptionCharCount(0)
            const updatedBrands = await getAllBrands() // Получаем полный список брендов за исключением мягко-удаленных
            setBrands(updatedBrands) // Обновляем стейт
            router.refresh() // Перезагружаем данные на странице через Server Component
            // В реальном приложении можно было бы обновить только стейт brands, но refresh проще
        } catch (error: any) {
            alert(`Ошибка: ${error.message}`)
        }
    }

    // Показать модальное окно подтверждения
    const handleDeleteClick = (brand: DictionaryItem) => {
        setBrandToDelete(brand)
        setShowConfirmDeleteModal(true)
    }

    // Выполнить удаление после подтверждения
    const handleConfirmDelete = async () => {
        if (!brandToDelete || !brandToDelete.id) {
            alert('Бренд для удаления не выбран.')
            return
        }
        try {
            // Вызываем Server Action напрямую
            await softDeleteBrand(brandToDelete.id)
            setShowConfirmDeleteModal(false) // Закрываем модалку подтверждения
            setBrandToDelete(null) // Очищаем выбранный бренд
            const updatedBrands = await getAllBrands() // Получаем актуальный список брендов
            setBrands(updatedBrands) // Обновляем стейт
        } catch (error: any) {
            console.error('Ошибка при удалении бренда:', error)
            alert(`Ошибка при удалении: ${error.message}`)
        }
    }

    const handlePageChange = (selectedPage: { selected: number }) => {
        const newPage = selectedPage.selected + 1 // ReactPaginate 0-индексирован, нам нужен 1-индексированный номер страницы
        const currentSearchParams = new URLSearchParams(searchParams)
        currentSearchParams.set('page', String(newPage)) // Устанавливаем или обновляем параметр 'page'
        router.push(path + '?' + currentSearchParams.toString()) // Переходим на новый URL
    }

    // Базовый стиль карточки
    const cardStyle =
        'relative flex flex-col justify-between p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group w-full h-44'
    // Стили для имени бренда
    const nameStyle =
        'text-lg font-semibold text-gray-800 group-hover:text-[#E99C28] mb-1 text-center truncate break-words'
    // Стили для описания бренда
    const descriptionStyle =
        'text-sm text-gray-600 overflow-hidden text-center flex-grow line-clamp-3 break-words'
    // Стили для ID при ховере - НЕТ, ЭТОТ БУДЕТ ПРИМЕНЕН К ОВЕРЛЕЮ ВНУТРИ!
    const idStyle =
        'absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75 text-white text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg'
    // Стили для контейнера кнопок действий
    const actionsContainerStyle =
        'flex flex-col sm:flex-row gap-1 mt-auto w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2'
    // Стили для кнопок внутри карточки
    const actionButtonStyle =
        'w-full button_blue text-xs px-2 py-1.5 justify-center'
    const deleteButtonStyle =
        'w-full button_red text-xs px-2 py-1.5 justify-center'

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row w-full justify-between align-center px-12 gap-2">
                <button
                    onClick={handleAddClick}
                    className="button_green mb-6 px-5 py-2"
                >
                    Добавить новый бренд 🛠️
                </button>
                <Link href={'/admin/products'}>Вернуться</Link>
            </div>

            {/*fixme не работает*/}
            {/*{pageCount > 1 && (*/}
            <div className="my-6">
                <ReactPaginateWrapper
                    pages={pageCount} // Передаем ВЫЧИСЛЕННОЕ pageCount
                    currentPage={currentPage} // Передаем currentPage, который пришел с сервера
                    onPageChange={handlePageChange}
                />
            </div>
            {/*)}*/}

            {/* Список брендов в виде карточек */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {brands.length === 0 ? (
                    <p className="col-span-full text-gray-600">
                        Бренды не найдены.
                    </p>
                ) : (
                    brands.map((brand) => (
                        <div key={brand.id} className={cardStyle}>
                            <div className="relative flex flex-col items-center flex-grow">
                                <div
                                    className={
                                        idStyle.replace('rounded-lg', '') +
                                        ' rounded-t-lg'
                                    }
                                >
                                    <span className="p-2">ID: {brand.id}</span>
                                </div>

                                {/* Название и описание */}
                                <span className={nameStyle} title={brand.name}>
                                    {brand.name}
                                </span>
                                <span
                                    className={descriptionStyle}
                                    title={brand.description || ''}
                                >
                                    {brand.description}
                                </span>
                            </div>

                            {/* Кнопки действий */}
                            <div className={actionsContainerStyle}>
                                <button
                                    onClick={() => handleEditClick(brand)}
                                    className={actionButtonStyle}
                                >
                                    <PencilIcon className="h-4 w-4 mr-1" />
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(brand)}
                                    className={deleteButtonStyle}
                                >
                                    <TrashIcon className="h-4 w-4 mr-1" />
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Модальное окно добавления редактирования */}
            {showModal && (
                <Modal
                    onClose={() => {
                        setShowModal(false)
                        setDescriptionCharCount(0)
                    }}
                >
                    {' '}
                    {/* Сброс счетчика при закрытии модалки */}
                    <h3 className="text-xl font-bold mb-4">
                        {currentBrand
                            ? 'Редактировать бренд'
                            : 'Добавить новый бренд'}
                    </h3>
                    <form action={handleSubmit} className="space-y-4">
                        {currentBrand?.id && (
                            <input
                                type="hidden"
                                name="id"
                                value={currentBrand.id}
                            />
                        )}
                        <div>
                            <label
                                htmlFor="brandName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Название бренда
                            </label>
                            <input
                                type="text"
                                placeholder={'введите от 2-х символов'}
                                id="brandName"
                                name="name"
                                defaultValue={currentBrand?.name || ''}
                                required
                                minLength={2}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="brandDescription"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Описание
                                <span className="ml-2 text-gray-500 text-xs">
                                    ({descriptionCharCount}/255 символов)
                                </span>
                            </label>
                            <textarea
                                rows={5}
                                placeholder={'введите от 2-х до 255 символов'}
                                id="brandDescription"
                                name="description"
                                defaultValue={currentBrand?.description || ''}
                                required
                                minLength={2}
                                maxLength={255}
                                onChange={handleDescriptionChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                id="isActive"
                                type="checkbox"
                                name="isActive"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="mr-2 leading-tight"
                                // disabled={isLoading}
                            />
                            <label
                                htmlFor="isActive"
                                className="text-gray-700 text-sm font-bold"
                            >
                                Активен
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false)
                                    setDescriptionCharCount(0)
                                }} // Сброс счетчика и закрытие
                                className="button_red px-4 py-2"
                            >
                                Отмена 🚫
                            </button>
                            <button
                                type="submit"
                                className="button_green px-4 py-2"
                            >
                                {currentBrand
                                    ? 'Сохранить изменения'
                                    : 'Создать бренд'}{' '}
                                ✅
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Модальное окно подтверждения удаления */}
            {showConfirmDeleteModal && brandToDelete && (
                <Modal
                    onClose={() => {
                        setShowConfirmDeleteModal(false)
                        setBrandToDelete(null)
                    }}
                >
                    <h3 className="text-xl font-bold mb-4 text-red-700">
                        Подтвердите удаление
                    </h3>
                    <p className="mb-6 text-gray-700">
                        Вы уверены, что хотите удалить бренд "
                        <span className="font-semibold">
                            {brandToDelete.name}
                        </span>
                        "? Это действие нельзя отменить. 💡
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button" // Важно: type="button", чтобы не отправлять форму случайно
                            onClick={handleConfirmDelete}
                            className="button_red px-4 py-2"
                        >
                            Да, удалить ❌
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowConfirmDeleteModal(false)
                                setBrandToDelete(null)
                            }}
                            className="button_green px-4 py-2 font-medium"
                        >
                            Отмена
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default BrandManager
