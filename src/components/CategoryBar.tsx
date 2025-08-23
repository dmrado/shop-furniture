import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'

// В файле CategoryBar.tsx

interface CategoryChild {
    id: number
    name: string
    slug: string
    image?: string

    children?: CategoryChild[]
}

interface CategoryBarProps {
    categoryChildren: CategoryChild[]
}

const CategoryBar = ({ categoryChildren }: CategoryBarProps) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Категории</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categoryChildren.map((category) => (
                    <Link
                        href={`/category/${category.slug}`}
                        key={category.id}
                        className="flex flex-col items-center group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                        <div className="relative w-16 h-16 mb-2 overflow-hidden">
                            <Image
                                src={category.image || '/placeholder.jpg'}
                                alt={category.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <span className="text-sm text-center font-medium text-gray-700 group-hover:text-blue-600">
                            {category.name}
                        </span>
                        {category.children && category.children.length > 0 && (
                            <span className="text-xs text-gray-500 mt-1">
                                {category.children.length} подкатегорий
                            </span>
                        )}
                    </Link>
                ))}
            </div>

            {/*<div className="mt-6">*/}
            {/*    <ReactPaginateWrapper pages={totalPages} currentPage={page}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default CategoryBar
