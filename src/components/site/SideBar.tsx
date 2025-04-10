import React from 'react'

// Левое боковое меню с фильтрами
const SideBar = ({ allCategories }) => {
    return <>
        <div className="flex flex-col md:flex-row gap-6">

            <div className="w-full md:w-64 flex-shrink-0">
                {/* Фильтр: Популярные */}
                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">Популярные</h3>
                        <button className="text-gray-500"
                            // onClick={() => toggleFilter('popular')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                    </div>

                    <div className="py-2 space-y-2">
                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() =>applyFilter('type', 'classic')}
                            >Классические
                            </button>
                        </div>

                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() => applyFilter('type', 'modern')}
                            >Современные
                            </button>
                        </div>
                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() =>applyFilter('type', 'corner')}
                            >Угловые
                            </button>
                        </div>
                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() =>applyFilter('type', 'soft')}
                            >Мягкие
                            </button>
                        </div>
                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() =>applyFilter('type', 'modular')}
                            >Модульные
                            </button>
                        </div>
                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() =>applyFilter('type', 'straight')}
                            >Прямые
                            </button>
                        </div>
                        <div className="pl-2">
                            <button className="w-full text-left py-1 hover:text-blue-600"
                                // onClick={() =>applyFilter('type', 'folding')}
                            >Раскладные
                            </button>
                        </div>
                    </div>

                </div>

                {/* Другие фильтры (свёрнутые) */}
                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">По стилю</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('style')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">По дизайну</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('design')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">По материалу</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('material')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">По цвету</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('color')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">По форме</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('shape')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">Производитель</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('manufacturer')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Фильтр: Цена */}
                <div className="mb-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <h3 className="font-medium">Цена</h3>
                        <button className="text-gray-500"
                            // onClick={() =>toggleFilter('price')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <div className="py-4 space-y-4">
                        <div className="flex gap-2">
                            <input type="number" className="w-1/2 border p-2 text-sm" placeholder={0}
                                min={0}
                                // onInput={() =>updatePriceRange}
                                v-model="priceMin"/>
                            <input type="number" className="w-1/2 border p-2 text-sm" placeholder="8 500 765"
                                min={0}
                                // onInput={() => updatePriceRange" v-model="priceMax"}
                            />
                        </div>
                        <div className="relative pt-1">
                            <div className="flex h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-amber-500 rounded"/>
                            </div>
                            <div className="absolute left-0 top-0 h-2 flex items-center">
                                <div className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"
                                    // onMouseDown={() => startDragging('min')}
                                />
                            </div>
                            <div className="absolute right-0 top-0 h-2 flex items-center">
                                <div className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"
                                    // onMouseDown={() => startDragging('max')"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            {/* Дополнительные фильтры */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center">
                    <input type="checkbox" id="inStock"
                        className="form-checkbox h-4 w-4 text-amber-500"
                        // onChange={e => applyFilter('inStock', e.target.checked)}
                    />
                    <label htmlFor="inStock" className="ml-2 text-sm">В наличии</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="new2024"
                        className="form-checkbox h-4 w-4 text-amber-500"
                        // onChange={e => applyFilter('new2024', e.target.checked)}
                    />
                    <label htmlFor="new2024" className="ml-2 text-sm">Новинки 2024</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="discounted"
                        className="form-checkbox h-4 w-4 text-amber-500"
                        // onChange={e => applyFilter('discounted', e.target.checked)}
                    />
                    <label htmlFor="discounted" className="ml-2 text-sm">Со скидками</label>
                </div>
            </div>

            {/* Кнопка сброса фильтров */}
            <button className="flex items-center text-sm text-gray-700 hover:text-black"
                // onClick={() => clearAllFilters}
            >
                Очистить все
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    </>
}

export default SideBar