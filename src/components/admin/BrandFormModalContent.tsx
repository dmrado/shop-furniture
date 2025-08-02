// components/admin/BrandFormModalContent.tsx
'use client' // Этот компонент должен быть клиентским

import React, { useState, useEffect } from 'react'
import { createBrand, updateBrand } from '@/actions/dictionaryActions' // Ваши серверные экшены

// Тип для состояния формы бренда
type BrandFormState = {
    id?: number
    name: string
    description: string
    isActive: boolean
}

type BrandFormModalContentProps = {
    onClose: () => void // Функция для закрытия модалки, передаваемая из обертки Modal
    onSuccess: () => void // Функция, вызываемая при успешном сохранении/обновлении
    initialData?: BrandFormState | null // Данные для редактирования
}

const BrandFormModalContent = ({ onClose, onSuccess, initialData }: BrandFormModalContentProps) => {
    const [ name, setName ] = useState(initialData?.name || '')
    const [ description, setDescription ] = useState(initialData?.description || '')
    const [ isActive, setIsActive ] = useState(initialData?.isActive ?? true)
    const [ descriptionCharCount, setDescriptionCharCount ] = useState(initialData?.description.length || 0)

    const [ error, setError ] = useState<string | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setDescription(initialData.description)
            setIsActive(initialData.isActive ?? true)
            setDescriptionCharCount(initialData.description.length)
        } else {
            setName('')
            setDescription('')
            setIsActive(true)
            setDescriptionCharCount(0)
        }
        setError(null) // Сброс ошибок при каждом открытии
    }, [ initialData ])

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setDescription(value)
        setDescriptionCharCount(value.length)
    }

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        setError(null)
        try {
            // FormData.append() нужно использовать, чтобы добавить стейты,
            // которые не привязаны напрямую к name input, или для переопределения.
            // В данном случае, name, description и isActive уже имеют name-атрибуты в JSX,
            // поэтому formData.get() их сам подхватит.
            // Но isActive лучше явно добавить, чтобы быть уверенным в булевом значении.
            // Или использовать helper из actions.

            // Если вы используете helper parseBooleanFromFormData в экшенах, то
            // isActive в FormData будет автоматически 'on' или null.
            // Если вы хотите передать строковое "true"/"false" явно, как я писал ранее:
            // formData.append('isActive', isActive ? 'true' : 'false');

            if (initialData?.id) {
                formData.append('id', initialData.id.toString())
                await updateBrand(formData)
            } else {
                await createBrand(formData)
            }
            onSuccess() // Вызываем колбэк при успехе
            onClose() // Модалка будет закрыта родительским компонентом после onSuccess
        } catch (error: any) {
            console.error('Ошибка в модалке BrandFormModalContent:', error)
            setError(error.message || 'Произошла ошибка при сохранении бренда.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <> {/* Заменил div на React.Fragment, так как это только содержимое для Modal */}
            <h3 className="text-xl font-bold mb-4">
                {initialData ? 'Редактировать бренд' : 'Добавить новый бренд'}
            </h3>
            <form action={handleSubmit} className="space-y-4">
                {initialData?.id && (
                    <input type="hidden" name="id" value={initialData.id}/>
                )}
                <div>
                    <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Название
                        бренда</label>
                    <input
                        type="text"
                        placeholder={'введите от 2-х символов'}
                        id="brandName"
                        name="name"
                        defaultValue={initialData?.name || ''}
                        required
                        minLength={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
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
                            setDescriptionCharCount(0) // Сброс при закрытии
                        }}
                        className="button_red px-4 py-2"
                        disabled={isLoading}
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="button_green px-4 py-2"
                        disabled={isLoading}
                    >
                        {initialData ? 'Сохранить изменения' : 'Создать бренд'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default BrandFormModalContent