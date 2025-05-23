import React from 'react'
import Link from 'next/link'

// const Breadcrumbs = ({categories}) => {
//     // if(!categories) return null
//     if(!categories) return 'Breadcrumbs is an empty'
//     return <>
//         {/* Навигационные хлебные крошки */}
//         <ul className="space-y-2">
//             {categories.map(category => (
//                 <li key={category.id}>
//                     <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
//                         <Link href={`/category/${category.slug}`} className="hover:text-gray-900">{category.name}</Link>
//                         <span className="text-gray-900">›</span>
//
//                         {category.children && category.children.length > 0 && (
//                             <ul className="ml-4 mt-1 space-y-1">
//                                 {category.children.map(subcategory => (
//                                     <li key={subcategory.id}>
//                                         <Link href={`/category/${category.slug}/${subcategory.slug}`}
//                                            className="hover:text-gray-900">{subcategory.name}
//                                         </Link>
//
//                                         <span className="text-gray-900">›</span>
//
//                                         {/* Отображение подкатегорий третьего уровня */}
//                                         {subcategory.children && subcategory.children.length > 0 && (
//                                             <ul className="ml-3 mt-1">
//                                                 {subcategory.children.map(thirdLevel => (
//                                                     <li key={thirdLevel.id}>
//                                                         <Link href={`/category/${category.slug}/${subcategory.slug}/${thirdLevel.slug}`}
//                                                            className="hover:text-gray-900">{thirdLevel.name}
//                                                         </Link>
//
//                                                         <span className="text-gray-900"></span>
//
//                                                         {/* Отображение подкатегорий четвертого уровня */}
//                                                         {subcategory.children && subcategory.children.length > 0 && (
//                                                             <ul className="ml-3 mt-1">
//                                                                 {subcategory.children.map(forthLevel => (
//                                                                     <li key={forthLevel.id}>
//                                                                         <Link href={`/category/${category.slug}/${subcategory.slug}/${thirdLevel.slug}/${forthLevel.slug}`}
//                                                                               className="hover:text-gray-900">{forthLevel.name}
//                                                                         </Link>
//
//                                                                         <span className="text-gray-900"></span>
//
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         )}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         )}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     </>
// }
// export default Breadcrumbs

// const Breadcrumbs = ({ categories }) => {
//     // Проверка наличия категорий
//     if (!categories) return 'Breadcrumbs is an empty'
//
//     // Рекурсивный компонент для отображения категории любого уровня вложенности
//     const CategoryItem = ({ category }) => {
//         // Формируем текущий путь для ссылки
//         // const currentPath = path ? `${path}/${category.slug}` : `/category/${category.slug}`
//
//         return (
//             <li key={category.id}>
//                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
//                     {/* Ссылка на текущую категорию */}
//                     <Link href={`/category/${category.slug}`} className="hover:text-gray-900">
//                         {category.name}
//                     </Link>
//
//                     {/* Разделитель (стрелка) */}
//                     <span className="text-gray-900">›</span>
//
//                     {/* Если есть дочерние категории, рекурсивно отображаем их */}
//                     {category.children && category.children.length > 0 && (
//                         <ul className="ml-4 mt-1 space-y-1">
//                             {category.children.map(childCategory => (
//                                 <CategoryItem
//                                     key={childCategory.id}
//                                     category={childCategory}
//                                     // path={currentPath}
//                                 />
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </li>
//         )
//     }
//
//     // Основной рендер компонента
//     return (
//         <>
//             {/* Навигационные хлебные крошки */}
//             <ul className="space-y-2">
//                 {categories.map(category => (
//                     <CategoryItem key={category.id} category={category} />
//                 ))}
//             </ul>
//         </>
//     )
// }

export type Breadcrumb = { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
    return (
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center space-x-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                        {idx > 0 && <span className="mx-2 text-gray-400">›</span>}
                        {item.href ? (
                            <a
                                href={item.href}
                                className="hover:underline text-gray-700 hover:text-blue-600 transition"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className="text-gray-700 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

// export default Breadcrumbs
