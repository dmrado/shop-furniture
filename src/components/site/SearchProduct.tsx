'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ProductSearchProps {
    // Ключ параметра запроса для поиска по названию продукта (например, 'name')
    queryKey?: string
    // Ключ параметра запроса для поиска по артикулу продукта или варианта (например, 'articul')
    articulQueryKey?: string
    // Placeholder для поля поиска по названию
    namePlaceholder?: string
    // Placeholder для поля поиска по артикулу
    articulPlaceholder?: string
    // Задержка в мс перед применением поиска (для debouncing)
    debounceTime?: number
}

const SearchProduct = ({
    queryKey = 'name',
    articulQueryKey = 'articul',
    namePlaceholder = 'Поиск по названию',
    articulPlaceholder = 'Поиск по артикулу',
    debounceTime = 300,
}: ProductSearchProps) => { // Убрал React.FC
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Инициализируем состояние из URL
    const [ nameSearchTerm, setNameSearchTerm ] = useState(searchParams.get(queryKey) || '')
    const [ articulSearchTerm, setArticulSearchTerm ] = useState(searchParams.get(articulQueryKey) || '')

    // Обновляем состояние, если URL меняется извне (например, кнопкой "Сбросить фильтры")
    useEffect(() => {
        setNameSearchTerm(searchParams.get(queryKey) || '')
        setArticulSearchTerm(searchParams.get(articulQueryKey) || '')
    }, [ searchParams, queryKey, articulQueryKey ])

    // Объединенный useEffect URL обновляется только один раз, когда пользователь перестаёт вводить текст в любом из полей заменяет два нижних отдельных но он вообще ломает пагинацию строкой current.delete('page')
    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         const current = new URLSearchParams(searchParams.toString())
    //
    //         // Обновляем параметр поиска по названию
    //         if (nameSearchTerm) {
    //             current.set(queryKey, nameSearchTerm)
    //         } else {
    //             current.delete(queryKey)
    //         }
    //
    //         // Обновляем параметр поиска по артикулу
    //         if (articulSearchTerm) {
    //             current.set(articulQueryKey, articulSearchTerm)
    //         } else {
    //             current.delete(articulQueryKey)
    //         }
    //
    //         // Сбрасываем на первую страницу при любом изменении поиска
    //         current.delete('page')
    //
    //         router.push(`${pathname}?${current.toString()}`)
    //     }, debounceTime)
    //
    //     return () => {
    //         clearTimeout(handler)
    //     }
    // }, [ nameSearchTerm, articulSearchTerm, debounceTime, router, pathname, searchParams, queryKey, articulQueryKey ])

    // Эффект для debounce-поиска по названию
    useEffect(() => {
        console.log('useEffect 1')
        const handler = setTimeout(() => {
            const current = new URLSearchParams(searchParams.toString())
            if (nameSearchTerm) {
                current.set(queryKey, nameSearchTerm)
            } else {
                current.delete(queryKey)
            }
            current.delete('page') // Сбрасываем на первую страницу при любом изменении поиска именно здесь оставляем
            router.push(`${pathname}?${current.toString()}`)
        }, debounceTime)

        return () => {
            clearTimeout(handler)
        }
    }, [ nameSearchTerm, debounceTime, router, pathname, searchParams, queryKey ])

    // Эффект для debounce-поиска по артикулу
    useEffect(() => {
        console.log('useEffect 2')
        const handler = setTimeout(() => {
            const current = new URLSearchParams(searchParams.toString())
            if (articulSearchTerm) {
                current.set(articulQueryKey, articulSearchTerm)
            } else {
                current.delete(articulQueryKey)
            }
            //current.delete('page') // fixme Сбрасываем на первую страницу при любом изменении поиска надо ли именно из за это строки пагинация перелетает на первую страницу все время?
            router.push(`${pathname}?${current.toString()}`)
        }, debounceTime)

        return () => {
            clearTimeout(handler)
        }
    }, [ articulSearchTerm, debounceTime, router, pathname, searchParams, articulQueryKey ])

    // Обработчик для кнопки "Очистить"
    const handleClearSearch = () => {
        setNameSearchTerm('')
        setArticulSearchTerm('')
        const current = new URLSearchParams(searchParams.toString())
        current.delete(queryKey)
        current.delete(articulQueryKey)
        current.delete('page')
        router.push(`${pathname}?${current.toString()}`)
    }

    // Проверяем, есть ли активные поисковые запросы (для отображения кнопки "Очистить")
    const hasActiveSearch = nameSearchTerm !== '' || articulSearchTerm !== ''

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

            {/* Кнопка "Очистить поиск" НЕ НУЖНА в этой форме уже есть такой функционал */}
            {/*{hasActiveSearch && (*/}
            {/*    <button*/}
            {/*        onClick={handleClearSearch}*/}
            {/*        className="button_blue px-4 py-2 text-sm whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0"*/}
            {/*    >*/}
            {/*        Очистить поиск*/}
            {/*    </button>*/}
            {/*)}*/}
        </div>
    )
}

export default SearchProduct