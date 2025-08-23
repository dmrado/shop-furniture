'use client'

import React, { useState, useEffect } from 'react'
import {
    createStyle,
    searchStylesByName,
    updateStyle
} from '@/actions/dictionaryActions'
import { DictionaryItem } from '@/db/types/common-types'
import DictionarySearchDeduplicator from '@/components/admin/DictionarySearchDeduplicator'

type StyleFormModalContentProps = {
    onClose: () => void
    onSuccess: () => void
    initialData?: DictionaryItem | null
}

const StyleFormModalContent = ({
    onClose,
    onSuccess,
    initialData
}: StyleFormModalContentProps) => {
    const [name, setName] = useState(initialData?.name || '')
    const [description, setDescription] = useState(
        initialData?.description || ''
    )
    const [isActive, setIsActive] = useState(initialData?.isActive ?? true)
    const [descriptionCharCount, setDescriptionCharCount] = useState(
        initialData?.description?.length || 0
    )

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    //----блок для поиска похожих значений по name для избегания дубликатов start----------
    //массив значений брендов из БД
    const [searchResults, setSearchResults] = useState<DictionaryItem[]>([])
    // для отслеживания дубликатов
    const [isDuplicate, setIsDuplicate] = useState(false)
    const debounceTime = 300

    useEffect(() => {
        // Дебаунсер  300 мс
        const handler = setTimeout(async () => {
            if (name.length >= 3) {
                const results = await searchStylesByName(name)
                setSearchResults(results)
                //Проверяем, есть ли точное совпадение с текущим стилем
                const exactMatch = results.find(
                    (c) => c.name.toLowerCase() === name.toLowerCase()
                )
                // Проверяем дубликат только в режиме создания
                if (!initialData && exactMatch) {
                    setIsDuplicate(true)
                    setError(
                        '❌ Такой стиль уже существует. Пожалуйста, выберите его из списка.'
                    )
                } else {
                    // если дубликата нет
                    setIsDuplicate(false)
                    setError(null)
                }
            } else {
                setSearchResults([])
                setIsDuplicate(false)
                setError(null) // Сбрасываем ошибку
            }
        }, debounceTime)
        // Очистка таймера при каждом новом вводе
        return () => clearTimeout(handler)
    }, [name, initialData])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        setName(newName)
        if (newName === '') {
            setIsActive(true)
        }
    }

    // для блокирования кнопки и показа, что есть такой бренд и дальнейшей инструкции юзеру
    //fixme этот аргумент style просто нужен олдин аргумент для функции
    const handleSelectExisting = (style: DictionaryItem) => {
        setError(
            '❌ Такой стиль уже существует. Пожалуйста, выберите его из списка.'
        )
        setIsDuplicate(true) // Убираем дубликат
        setSearchResults([]) // Скрываем результаты поиска после выбора
    }
    // ----блок для поиска похожих значений по name для избегания дубликатов end----------

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

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
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
                await updateStyle(formData)
            } else {
                await createStyle(formData)
            }
            onSuccess()
            onClose()
        } catch (error: any) {
            console.error('Ошибка в модалке StyleFormModalContent:', error)
            setError(error.message || 'Произошла ошибка при сохранении стиля.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <h3 className="text-xl font-bold mb-4">
                {initialData ? 'Редактировать стиль' : 'Добавить новый стиль'}
            </h3>
            <form action={handleSubmit} className="space-y-4">
                {initialData?.id && (
                    <input type="hidden" name="id" value={initialData.id} />
                )}
                <div>
                    <label
                        htmlFor="styleName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Название стиля
                    </label>
                    <input
                        onChange={handleNameChange}
                        type="text"
                        placeholder={'введите от 2-х символов'}
                        id="styleName"
                        name="name"
                        value={name}
                        // defaultValue={initialData?.name || ''}
                        required
                        minLength={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                    />
                </div>

                {/* Компонент для дедупликации */}
                {name.length >= 3 && (
                    <DictionarySearchDeduplicator
                        searchResults={searchResults}
                        onSelectExisting={handleSelectExisting}
                        label="бренды"
                        href={'styles'}
                    />
                )}

                <div>
                    <label
                        htmlFor="styleDescription"
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
                        id="styleDescription"
                        name="description"
                        value={description}
                        // defaultValue={initialData?.description || ''}
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
                    <label
                        htmlFor="isActive"
                        className="text-gray-700 text-sm font-bold"
                    >
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
                        className={`px-4 py-2 ${isDuplicate ? 'button_blue' : 'button_red'}`}
                        disabled={isLoading}
                    >
                        {isDuplicate ? 'Назад' : 'Отмена'}
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 ${isDuplicate ? 'button_red' : 'button_green'}`}
                        disabled={isLoading || isDuplicate}
                    >
                        {isDuplicate
                            ? 'Ошибка'
                            : `${initialData ? 'Сохранить изменения' : 'Создать бренд'} ✅`}
                    </button>
                </div>
            </form>
        </>
    )
}

export default StyleFormModalContent
