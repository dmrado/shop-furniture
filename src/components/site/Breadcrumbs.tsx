import React from 'react'

const Breadcrumbs = () => {
    return <>
        {/* Навигационные хлебные крошки */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <a href="#" className="hover:text-gray-900">Главная</a>
            <span>›</span>
            <a href="#" className="hover:text-gray-900">Каталог</a>
            <span>›</span>
            <span className="text-gray-900">Диваны</span>
        </div>
        </>
}
export default Breadcrumbs