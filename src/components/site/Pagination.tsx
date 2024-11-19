'use client'
import React from 'react'

const Pagination = () => {
    return <>
        {/* Пагинация */}
        <div className="mt-12 flex justify-center">
            <nav className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    Назад
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    1
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    2
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    3
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    Вперед
                </button>
            </nav>
        </div>
    </>
}

export default Pagination