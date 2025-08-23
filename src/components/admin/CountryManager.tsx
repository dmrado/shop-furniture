'use client'

import React, { useState } from 'react'
import { DictionaryItem } from '@/db/types/common-types'
import {
    createCountry,
    getAllCountries,
    softDeleteCountry,
    updateCountry
} from '@/actions/dictionaryActions'
import Modal from '@/components/ui/Modal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import Link from 'next/link'

type CountryManagementClientProps = {
    initialCountries: DictionaryItem[]
    itemsPerPage: number
    currentPage: number
    totalCount: number
}

const CountryManager = ({
    initialCountries,
    itemsPerPage,
    currentPage,
    totalCount
}: CountryManagementClientProps) => {
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()

    const [countries, setCountries] =
        useState<DictionaryItem[]>(initialCountries)
    const [showModal, setShowModal] = useState(false)
    const [currentCountry, setCurrentCountry] = useState<DictionaryItem | null>(
        null
    )
    const [descriptionCharCount, setDescriptionCharCount] = useState(0)

    const pageCount = Math.ceil(totalCount / itemsPerPage)

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [countryToDelete, setCountryToDelete] =
        useState<DictionaryItem | null>(null)

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescriptionCharCount(e.target.value.length)
    }

    const handleEditClick = (country: DictionaryItem) => {
        const desc = country.description || ''
        setCurrentCountry({
            id: country.id,
            name: country.name,
            description: desc,
            isActive: country.isActive ?? true
        })
        setDescriptionCharCount(desc.length)
        setShowModal(true)
    }

    const handleAddClick = () => {
        setCurrentCountry(null)
        setDescriptionCharCount(0)
        setShowModal(true)
    }

    const handleSubmit = async (formData: FormData) => {
        try {
            if (currentCountry?.id) {
                await updateCountry(formData)
            } else {
                await createCountry(formData)
            }
            setShowModal(false)
            setDescriptionCharCount(0)
            const updatedCountries = await getAllCountries()
            setCountries(updatedCountries)
            router.refresh()
        } catch (error: any) {
            alert(`Ошибка: ${error.message}`)
        }
    }

    const handleDeleteClick = (country: DictionaryItem) => {
        setCountryToDelete(country)
        setShowConfirmDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        if (countryToDelete?.id) {
            try {
                await softDeleteCountry(countryToDelete.id)
                setShowConfirmDeleteModal(false)
                setCountryToDelete(null)
                router.refresh()
            } catch (error: any) {
                console.error('Ошибка при удалении страны:', error)
                alert(`Ошибка при удалении: ${error.message}`)
            }
        }
    }

    const handlePageChange = (selectedPage: { selected: number }) => {
        const newPage = selectedPage.selected + 1
        const currentSearchParams = new URLSearchParams(searchParams)
        currentSearchParams.set('page', String(newPage))
        router.push(path + '?' + currentSearchParams.toString())
    }

    const cardStyle =
        'relative flex flex-col justify-between p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group w-full h-44'
    const nameStyle =
        'text-lg font-semibold text-gray-800 group-hover:text-[#E99C28] mb-1 text-center truncate break-words'
    const descriptionStyle =
        'text-sm text-gray-600 overflow-hidden text-center flex-grow line-clamp-3 break-words'
    const idStyle =
        'absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75 text-white text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg'
    const actionsContainerStyle =
        'flex flex-col sm:flex-row gap-1 mt-auto w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2'
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
                    Добавить новую страну 🛠️
                </button>
                <Link href={'/admin/products'}>Вернуться</Link>
            </div>
            <div className="my-6">
                <ReactPaginateWrapper
                    pages={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {countries.length === 0 ? (
                    <p className="col-span-full text-gray-600">
                        Страны не найдены.
                    </p>
                ) : (
                    countries.map((country) => (
                        <div key={country.id} className={cardStyle}>
                            <div className="relative flex flex-col items-center flex-grow">
                                <div
                                    className={
                                        idStyle.replace('rounded-lg', '') +
                                        ' rounded-t-lg'
                                    }
                                >
                                    <span className="p-2">
                                        ID: {country.id}
                                    </span>
                                </div>
                                <span
                                    className={nameStyle}
                                    title={country.name}
                                >
                                    {country.name}
                                </span>
                                <span
                                    className={descriptionStyle}
                                    title={country.description || ''}
                                >
                                    {country.description}
                                </span>
                            </div>
                            <div className={actionsContainerStyle}>
                                <button
                                    onClick={() => handleEditClick(country)}
                                    className={actionButtonStyle}
                                >
                                    <PencilIcon className="h-4 w-4 mr-1" />{' '}
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(country)}
                                    className={deleteButtonStyle}
                                >
                                    <TrashIcon className="h-4 w-4 mr-1" />{' '}
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showModal && (
                <Modal
                    onClose={() => {
                        setShowModal(false)
                        setDescriptionCharCount(0)
                    }}
                >
                    <h3 className="text-xl font-bold mb-4">
                        {currentCountry
                            ? 'Редактировать страну'
                            : 'Добавить новую страну'}
                    </h3>
                    <form action={handleSubmit} className="space-y-4">
                        {currentCountry?.id && (
                            <input
                                type="hidden"
                                name="id"
                                value={currentCountry.id}
                            />
                        )}
                        <div>
                            <label
                                htmlFor="countryName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Название страны
                            </label>
                            <input
                                type="text"
                                placeholder={'введите от 2-х символов'}
                                id="countryName"
                                name="name"
                                defaultValue={currentCountry?.name || ''}
                                required
                                minLength={2}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="countryDescription"
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
                                id="countryDescription"
                                name="description"
                                defaultValue={currentCountry?.description || ''}
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
                                defaultChecked={
                                    currentCountry?.isActive ?? true
                                }
                                className="mr-2 leading-tight"
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
                                }}
                                className="button_red px-4 py-2"
                            >
                                Отмена 🚫
                            </button>
                            <button
                                type="submit"
                                className="button_green px-4 py-2"
                            >
                                {currentCountry
                                    ? 'Сохранить изменения'
                                    : 'Создать страну'}{' '}
                                ✅
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
            {showConfirmDeleteModal && countryToDelete && (
                <Modal
                    onClose={() => {
                        setShowConfirmDeleteModal(false)
                        setCountryToDelete(null)
                    }}
                >
                    <h3 className="text-xl font-bold mb-4 text-red-700">
                        Подтвердите удаление
                    </h3>
                    <p className="mb-6 text-gray-700">
                        Вы уверены, что хотите удалить страну "
                        <span className="font-semibold">
                            {countryToDelete.name}
                        </span>
                        "? Это действие нельзя отменить. 💡
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleConfirmDelete}
                            className="button_red px-4 py-2"
                        >
                            Да, удалить ❌
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowConfirmDeleteModal(false)
                                setCountryToDelete(null)
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

export default CountryManager
