'use client'

import React, { useState } from 'react'
import { DictionaryItem } from '@/db/types/common-types' // Предполагаем, что этот тип у вас есть
import { createBrand, updateBrand } from '@/actions/dictionaryActions' // Импортируем actions
import Modal from '@/components/ui/Modal' // Вам понадобится компонент модального окна
import {usePathname, useRouter, useSearchParams} from 'next/navigation' // Для router.refresh()
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ReactPaginateWrapper from "@/components/site/ReactPaginateWrapper"; // <-- ИМПОРТ ИКОНОК

// Пропсы для компонента
type BrandManagementClientProps = {
    initialBrands: DictionaryItem[]
    removeBrand: (id: number) => Promise<void> // Функция удаления передается из Server Component
}

// Интерфейс для формы бренда
interface BrandFormState {
    id?: number | null;
    name: string;
    description: string;
}

const BrandManager = ({ initialBrands, removeBrand, }: BrandManagementClientProps) => {
    const router = useRouter()

    const [ brands, setBrands ] = useState<DictionaryItem[]>(initialBrands) // Состояние для брендов
    const [ showModal, setShowModal ] = useState(false) // Состояние для модального окна
    const [ currentBrand, setCurrentBrand ] = useState<BrandFormState | null>(null) // Для редактирования/создания

    //для подсчета символов в description
    const [ descriptionCharCount, setDescriptionCharCount ] = useState(0)

    // Функция для обновления счетчика символов при изменении textarea
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionCharCount(e.target.value.length)
    }

    const handleEditClick = (brand: DictionaryItem) => {
        const desc = brand.description || ''
        setCurrentBrand({ id: brand.id, name: brand.name, description: desc })
        setDescriptionCharCount(desc.length) // Устанавливаем начальное значение счетчика
        setShowModal(true)
    }

    // При создании нового бренда или закрытии модалки, сбрасываем счетчик
    const handleAddClick = () => {
        setCurrentBrand(null)
        setDescriptionCharCount(0) // Сбрасываем счетчик
        setShowModal(true)
    }

    // Обработчик отправки формы (создание/обновление)
    const handleSubmit = async (formData: FormData) => {
        try {
            if (currentBrand?.id) {
                // Если есть id, это редактирование
                await updateBrand(formData)
            } else {
                // Иначе, это создание
                await createBrand(formData)
            }
            setShowModal(false) // Закрываем модальное окно
            setDescriptionCharCount(0)
            router.refresh() // Перезагружаем данные на странице через Server Component
            // В реальном приложении можно было бы обновить только стейт brands, но refresh проще
        } catch (error: any) {
            alert(`Ошибка: ${error.message}`)
        }
    }


    const handlePageChange = (selectedPage: { selected: number }) => {
        const newPage = selectedPage.selected + 1 // ReactPaginate 0-индексирован, нам нужен 1-индексированный номер страницы
        const currentSearchParams = new URLSearchParams(searchParams)
        currentSearchParams.set('page', String(newPage)) // Устанавливаем или обновляем параметр 'page'
        router.push(path + '?' + currentSearchParams.toString()) // Переходим на новый URL
    }

    // Базовый стиль карточки
    const brandCardStyle = 'relative flex flex-col justify-between p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group w-full h-44'
    // Стили для имени бренда
    const brandNameStyle = 'text-lg font-semibold text-gray-800 group-hover:text-[#E99C28] mb-1 text-center truncate break-words'
    // Стили для описания бренда
    const brandDescriptionStyle = 'text-sm text-gray-600 overflow-hidden text-center flex-grow line-clamp-3 break-words'
    // Стили для ID при ховере
    const brandIdStyle = 'absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75 text-white text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg'
    // Стили для контейнера кнопок действий
    const brandActionsContainerStyle = 'flex flex-col sm:flex-row gap-1 mt-auto w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2'
    // Стили для кнопок внутри карточки
    const brandActionButtonStyle = 'w-full button_blue text-xs px-2 py-1.5 justify-center'
    const brandDeleteButtonStyle = 'w-full button_red text-xs px-2 py-1.5 justify-center'

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Управление брендами</h2>

            <button
                onClick={handleAddClick}
                className="button_green mb-6 px-5 py-2"
            >
                Добавить новый бренд
            </button>

            {/* Список брендов в виде карточек */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"> {/* Увеличил количество колонок для лучшего отображения */}
                {brands.length === 0 ? (
                    <p className="col-span-full text-gray-600">Бренды не найдены.</p>
                ) : (
                    brands.map((brand) => (
                        <div key={brand.id} className={brandCardStyle}>
                            {/* Название и описание */}
                            <div className="flex flex-col items-center ">
                                <span className={brandNameStyle} title={brand.name}>{brand.name}</span>
                                <span className={brandDescriptionStyle}
                                    title={brand.description || ''}>{brand.description}</span>
                            </div>

                            {/* ID при ховере - отображается поверх всего, кроме кнопок */}
                            <span className={brandIdStyle}>ID: {brand.id}</span>

                            {/* Кнопки действий - появляются под названием/описанием при ховере */}
                            <div className={brandActionsContainerStyle}>
                                <button
                                    onClick={() => handleEditClick(brand)}
                                    className={brandActionButtonStyle}
                                >
                                    <PencilIcon className="h-4 w-4 mr-1"/>
                                                Редактировать
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Вы уверены, что хотите удалить бренд "${brand.name}"?`)) {
                                            removeBrand(brand.id!)
                                            router.refresh()
                                        }
                                    }}
                                    className={brandDeleteButtonStyle}
                                >
                                    <TrashIcon className="h-4 w-4 mr-1"/>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Модальное окно без изменений */}
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    setDescriptionCharCount(0)
                }}> {/* Сброс счетчика при закрытии модалки */}
                    <h3 className="text-xl font-bold mb-4">
                        {currentBrand ? 'Редактировать бренд' : 'Добавить новый бренд'}
                    </h3>
                    <form action={handleSubmit} className="space-y-4">
                        {currentBrand?.id && (
                            <input type="hidden" name="id" value={currentBrand.id}/>
                        )}
                        <div>
                            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Название
                                бренда</label>
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
                            <label htmlFor="brandDescription"
                                className="block text-sm font-medium text-gray-700">Описание
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
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false)
                                    setDescriptionCharCount(0)
                                }} // Сброс счетчика и закрытие
                                className="button_red px-4 py-2"
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                className="button_green px-4 py-2"
                            >
                                {currentBrand ? 'Сохранить изменения' : 'Создать бренд'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default BrandManager