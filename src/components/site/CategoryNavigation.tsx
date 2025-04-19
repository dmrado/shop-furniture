import Link from 'next/link'

const CategoryNavigation = ({ categories }) => {
    return (
        <nav className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-medium mb-3">Навигация по категориям</h2>
            <ul className="space-y-2">
                {categories.map(category => (
                    <li key={category.id}>
                        <Link
                            href={`/category/${category.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            {category.name}
                        </Link>

                        {category.children && category.children.length > 0 && (
                            <ul className="ml-4 mt-1 space-y-1">
                                {category.children.map(subcategory => (
                                    <li key={subcategory.id}>
                                        <Link
                                            href={`/category/${category.slug}/${subcategory.slug}`}
                                            className="text-blue-500 hover:underline text-sm"
                                        >
                                            {subcategory.name}
                                        </Link>

                                        {/* Отображение подкатегорий третьего уровня */}
                                        {subcategory.children && subcategory.children.length > 0 && (
                                            <ul className="ml-3 mt-1">
                                                {subcategory.children.map(thirdLevel => (
                                                    <li key={thirdLevel.id}>
                                                        <Link
                                                            href={`/category/${category.slug}/${subcategory.slug}/${thirdLevel.slug}`}
                                                            className="text-gray-600 hover:underline text-xs"
                                                        >
                                                            {thirdLevel.name}
                                                        </Link>
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
        </nav>
    )
}

export default CategoryNavigation
