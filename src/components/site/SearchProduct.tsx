'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SelectWithOptions from '@/components/site/SelectWithOptions'

interface ProductSearchProps {
    // Ключ параметра запроса для поиска по названию продукта (например, 'name')
    nameQueryKey?: string
    // Ключ параметра запроса для поиска по артикулу продукта или варианта (например, 'articul')
    articulQueryKey?: string
    // Placeholder для поля поиска по названию
    namePlaceholder?: string
    // Placeholder для поля поиска по артикулу
    articulPlaceholder?: string
    // Задержка в мс перед применением поиска (для debouncing)
    debounceTime?: number
    // Массив опций для селекта категорий
    categoryOptions?: { label: string; value: string }[]
}

const SearchProduct = ({
    nameQueryKey = 'name',
    articulQueryKey = 'articul',
    categoryQueryKey = 'category',
    namePlaceholder = 'Поиск по названию',
    articulPlaceholder = 'Поиск по артикулу',
    debounceTime = 300,
    categoryOptions = [],
}: ProductSearchProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Инициализируем состояние из URL
    const [ nameSearchTerm, setNameSearchTerm ] = useState(searchParams.get(nameQueryKey) || '')
    const [ articulSearchTerm, setArticulSearchTerm ] = useState(searchParams.get(articulQueryKey) || '')
    const [ categorySearchTerm, setCategorySearchTerm ] = useState(searchParams.get(categoryQueryKey) || '')

    // Обновляем состояние, если URL меняется извне (например, кнопкой "Сбросить фильтры")
    useEffect(() => {
        setNameSearchTerm(searchParams.get(nameQueryKey) || '')
        setArticulSearchTerm(searchParams.get(articulQueryKey) || '')
        setCategorySearchTerm(searchParams.get(categoryQueryKey) || '')

    }, [ searchParams, nameQueryKey, articulQueryKey, categoryQueryKey ])

    const handleSearchChange = (queryKey:string, queryValue: string) => {
        const current = new URLSearchParams(searchParams.toString())
        if (queryValue) {
            current.set(queryKey, queryValue)
        } else {
            current.delete(queryKey)
        }
        current.delete('page')
        router.push(`${pathname}?${current.toString()}`)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearchChange(nameQueryKey, nameSearchTerm)
        }, debounceTime)

        return () => clearTimeout(handler)
    }, [ nameSearchTerm ])

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearchChange(articulQueryKey, articulSearchTerm)
        }, debounceTime)

        return () => clearTimeout(handler)
    }, [ articulSearchTerm ])

    // Отдельный useEffect для select. Для select, в отличие от input, не нужен debounce, так как событие `onChange` срабатывает только один раз при выборе
    useEffect(() => {
        handleSearchChange(categoryQueryKey, categorySearchTerm)
    }, [ categorySearchTerm, categoryQueryKey ])

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="flex-grow w-full sm:w-auto">
                <label htmlFor="nameSearch" className="sr-only">
                    {namePlaceholder}
                </label>
                <input
                    type="text"
                    id="nameSearch"
                    value={nameSearchTerm}
                    onChange={(e) => setNameSearchTerm(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={namePlaceholder}
                />
            </div>

            <div className="flex-grow w-full sm:w-auto">
                <label htmlFor="articulSearch" className="sr-only">
                    {articulPlaceholder}
                </label>
                <input
                    type="text"
                    id="articulSearch"
                    value={articulSearchTerm}
                    onChange={(e) => setArticulSearchTerm(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={articulPlaceholder}
                />
            </div>

            {/* Добавляем селект для категорий */}
            <div className="flex-grow w-full sm:w-auto">
                <label htmlFor="categorySearch" className="sr-only">
                    Поиск по категории
                </label>
                <SelectWithOptions
                    options={categoryOptions || []}
                    placeholder={'Поиск по категории'}
                    value={categorySearchTerm}
                    onChange={(value) => setCategorySearchTerm(value)}
                />
            </div>
        </div>
    )
}

export default SearchProduct
