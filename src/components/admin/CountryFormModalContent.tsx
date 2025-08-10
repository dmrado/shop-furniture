'use client'

import React, { useState, useEffect } from 'react'
import { createCountry, updateCountry } from '@/actions/dictionaryActions'
import { DictionaryItem } from '@/db/types/common-types'

type CountryFormModalContentProps = {
    onClose: () => void
    onSuccess: () => void
    initialData?: DictionaryItem | null
}

const CountryFormModalContent = ({ onClose, onSuccess, initialData }: CountryFormModalContentProps) => {
    const [name, setName] = useState(initialData?.name || '')
    const [description, setDescription] = useState(initialData?.description || '')
    const [isActive, setIsActive] = useState(initialData?.isActive ?? true)
    const [descriptionCharCount, setDescriptionCharCount] = useState(initialData?.description?.length || 0)

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setDescription(initialData.description || '')
            setIsActive(initialData.isActive ?? true)
            setDescriptionCharCount(initialData.description?.length || 0)
        } else {
            setName('')
            setDescription('')
            setIsActive(true)
            setDescriptionCharCount(0)
        }
        setError(null)
    }, [initialData])

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setDescription(value)
        setDescriptionCharCount(value.length)
    }

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        setError(null)
        try {
            if (initialData?.id) {
                formData.append('id', initialData.id.toString())
                await updateCountry(formData)
            } else {
                await createCountry(formData)
            }
            onSuccess()
            onClose()
        } catch (error: any) {
            console.error('Ошибка в модалке CountryFormModalContent:', error)
            setError(error.message || 'Произошла ошибка при сохранении страны.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <h3 className="text-xl font-bold mb-4">
                {initialData ? 'Редактировать страну' : 'Добавить новую страну'}
            </h3>
            <form action={handleSubmit} className="space-y-4">
                {initialData?.id && (
                    <input type="hidden" name="id" value={initialData.id}/>
                )}
                <div>
                    <label htmlFor="countryName" className="block text-sm font-medium text-gray-700">Название страны</label>
                    <input
                        type="text"
                        placeholder={'введите от 2-х символов'}
                        id="countryName"
                        name="name"
                        defaultValue={initialData?.name || ''}
                        required
                        minLength={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="countryDescription" className="block text-sm font-medium text-gray-700">
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
                        defaultValue={initialData?.description || ''}
                        required
                        minLength={2}
                        maxLength={255}
                        onChange={handleDescriptionChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                    <label htmlFor="isActive" className="text-gray-700 text-sm font-bold">
                        Активен
                    </label>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            onClose()
                            setDescriptionCharCount(0)
                        }}
                        className="button_red px-4 py-2"
                        disabled={isLoading}
                    >
                        Отмена 🚫
                    </button>
                    <button
                        type="submit"
                        className="button_green px-4 py-2"
                        disabled={isLoading}
                    >
                        {initialData ? 'Сохранить изменения' : 'Создать страну'} ✅
                    </button>
                </div>
            </form>
        </>
    )
}

export default CountryFormModalContent