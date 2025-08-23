import React from 'react'
import { DictionaryItem } from '@/db/types/common-types'
import Link from 'next/link'

//Компонент отвечает за вывод бренда, коллекции, страны и стиля в поле названия модального окна при добавлении продукта, нужен для уменьшения дубликатов в БД

type DictionarySearchDeduplicatorProps = {
    searchResults: DictionaryItem[]
    onSelectExisting: (item: DictionaryItem) => void
    label: string
    href: string
}

const DictionarySearchDeduplicator = ({
    searchResults,
    onSelectExisting,
    label,
    href
}: DictionarySearchDeduplicatorProps) => {
    if (searchResults.length === 0) {
        return null
    }

    return (
        <div className="mb-4 p-2 bg-gray-100 rounded-lg max-h-48 overflow-y-auto">
            <p className="text-sm font-semibold text-gray-600 mb-2">
                Найдены похожие {label},&nbsp;
                <span className="text-red-500">
                    рекомендуется&nbsp;
                    <Link href={`/admin/${href}`} className="text-blue-500">
                        перейти
                    </Link>
                    &nbsp; на основную страницу управления:
                </span>
            </p>
            <ul>
                {searchResults.map((result) => (
                    <li
                        key={result.id}
                        onClick={() => onSelectExisting(result)}
                        className="py-1 px-2 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                    >
                        {result.name}
                        {!result.isActive && (
                            <span className="ml-2 text-xs text-red-500">
                                (Неактивна)
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DictionarySearchDeduplicator
