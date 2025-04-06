import React from 'react'
import Link from "next/link";

const Breadcrumbs = ({categories}) => {
    // if(!categories) return null
    if(!categories) return 'Breadcrumbs is not an empty'
    return <>
        {/* Навигационные хлебные крошки */}
        <ul className="space-y-2">
            {categories.map(category => (
                <li key={category.id}>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Link href={`/catalog/${category.slug}`} className="hover:text-gray-900">{category.name}</Link>
                        <span className="text-gray-900">›</span>

                        {category.children && category.children.length > 0 && (
                            <ul className="ml-4 mt-1 space-y-1">
                                {category.children.map(subcategory => (
                                    <li key={subcategory.id}>
                                        <Link href={`/catalog/${category.slug}/${subcategory.slug}`}
                                           className="hover:text-gray-900">{subcategory.name}
                                        </Link>

                                        <span className="text-gray-900">›</span>

                                        {/* Отображение подкатегорий третьего уровня */}
                                        {subcategory.children && subcategory.children.length > 0 && (
                                            <ul className="ml-3 mt-1">
                                                {subcategory.children.map(thirdLevel => (
                                                    <li key={thirdLevel.id}>
                                                        <Link href={`/catalog/${category.slug}/${subcategory.slug}/${thirdLevel.slug}`}
                                                           className="hover:text-gray-900">{thirdLevel.name}
                                                        </Link>

                                                        <span className="text-gray-900"></span>

                                                        {/* Отображение подкатегорий четвертого уровня */}
                                                        {subcategory.children && subcategory.children.length > 0 && (
                                                            <ul className="ml-3 mt-1">
                                                                {subcategory.children.map(forthLevel => (
                                                                    <li key={forthLevel.id}>
                                                                        <Link href={`/catalog/${category.slug}/${subcategory.slug}/${thirdLevel.slug}/${forthLevel.slug}`}
                                                                              className="hover:text-gray-900">{forthLevel.name}
                                                                        </Link>

                                                                        <span className="text-gray-900"></span>

                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    </>
}
export default Breadcrumbs