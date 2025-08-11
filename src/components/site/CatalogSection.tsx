import React from 'react'

// Правая часть с товарами

const CatalogSection = () => {
    return <>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
                {/* Информация о количестве найденных товаров */}
                <div className="text-sm text-gray-700 mb-4">
                Найдено товаров: 1578
                </div>

                {/* Контейнер для карточек товаров (здесь будет использоваться map) */}
                {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">*/}

                {/* Шаблон карточки товара, который будет использоваться в map */}
                {/* v-for="product in products" :key="product.id" */}
                <div className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">

                    {/* Изображение товара */}
                    <div className="relative">
                        <img src="path/to/image.jpg" alt="Диван Monusom Large Flexform"
                            className="w-full h-64 object-cover"/>
                        {/* Статус наличия */}

                        <div className="absolute bottom-2 left-2 flex items-center">
                            <span className="text-amber-500 text-xs mr-1">★</span>
                            <span className="text-xs text-gray-800 bg-white/80 px-1 rounded">В наличии</span>
                        </div>

                    </div>

                    {/* Информация о товаре */}
                    <div className="p-4">
                        <h3 className="font-medium mb-2">Диван Monusom Large Flexform</h3>

                        <div className="flex justify-between items-center mt-4">
                            <div className="font-bold">357 790 ₽</div>

                            <div className="flex items-center space-x-2">
                                {/* Кнопка добавления в корзину */}

                                <button className="bg-amber-500 hover:bg-amber-600 text-white p-1 rounded"
                                    // onClick={() => addToCart(product.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                                    </svg>
                                </button>

                                {/* Кнопка добавления в избранное */}
                                <button className="text-gray-400 hover:text-amber-500 p-1"
                                    // onClick={() => toggleFavorite(product.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                {/*</div>*/}
            </div>
        </div>
    </>
}

export default CatalogSection