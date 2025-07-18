'use client'
import React, { useState, useEffect } from 'react'
import { handleProductVariantForm } from '@/actions/handleProductVariantForm.ts' // Импортируем новый Server Action
import { getProducts, getColors } from '@/actions/dictionaryActions.ts' // Импортируем новые Server Actions для продуктов и цветов
import { ProductVariantModel } from '@/db/models/product_variant.model' // Импортируем модель варианта продукта

type ProductVariantFormProps = {
    productVariant?: ProductVariantModel // Может быть не передан при создании нового варианта
    productId: number
}

// Типы для элементов справочника (Product, Color)
type DictionaryItem = {
    id: number
    name: string
}
// Для ColorModel может быть полезно также получить 'code'
type ColorItem = {
    id: number
    name: string
    code: string // Если тебе нужен код цвета для отображения
}

const ProductVariantForm = ({ productVariant, productId }: ProductVariantFormProps) => {
    // Инициализируем состояния, используя данные из productVariant или значения по умолчанию
    const [ isActive, setIsActive ] = useState(productVariant?.isActive || false)
    const [ articul, setArticul ] = useState(productVariant?.articul || '')

    // ID внешних ключей
    // const [ productId, setProductId ] = useState(productVariant?.productId || 1) // 1 как дефолт
    const [ colorId, setColorId ] = useState(productVariant?.colorId || 1)     // 1 как дефолт

    // Числовые поля
    const [ length, setLength ] = useState(productVariant?.length || 0)
    const [ width, setWidth ] = useState(productVariant?.width || 0)
    const [ height, setHeight ] = useState(productVariant?.height || 0)
    const [ box_length, setBoxLength ] = useState(productVariant?.box_length || 0)
    const [ box_height, setBoxHeight ] = useState(productVariant?.box_height || 0)
    const [ box_weight, setBoxWeight ] = useState(productVariant?.box_weight || 0)
    const [ weight, setWeight ] = useState(productVariant?.weight || 0)
    const [ price, setPrice ] = useState(productVariant?.price || 0) // Цена может быть десятичной, поэтому useState(0)

    // Состояния для хранения списков справочников
    const [ colors, setColors ] = useState<ColorItem[]>([]) // Используем ColorItem для цвета

    // Состояния для валидации
    const [ touchedArticul, setTouchedArticul ] = useState(false)
    const isArticulValid = () => !touchedArticul || (touchedArticul && articul.length > 0) // Простая валидация

    // useEffect для загрузки данных при монтировании компонента
    useEffect(() => {
        const loadDictionaryData = async () => {
            const fetchedColors = await getColors()

            setColors(fetchedColors)

            // Установка выбранных значений для редактирования
            if (productVariant) {

                if (productVariant.colorId && fetchedColors.some(c => c.id === productVariant.colorId)) {
                    setColorId(productVariant.colorId)
                } else if (fetchedColors.length > 0) {
                    setColorId(fetchedColors[0].id)
                }
            } else {
                // Для нового варианта, если есть данные, выбираем первый доступный ID
                if (fetchedColors.length > 0) setColorId(fetchedColors[0].id)
            }
        }

        loadDictionaryData()
    }, [ productVariant ]) // Зависимость от productVariant для режима редактирования

    const onSubmit = (formData: FormData) => {
        handleProductVariantForm(formData)
    }

    // Стили кнопки submit
    const buttonStyle = () => {
        const baseStyle: string = 'border-2 border-my_white border-solid px-5 py-2 rounded '
        // Простая валидация: артикул не пустой
        if (isArticulValid()) {
            return baseStyle + 'hover:text-my_l_green hover:border-2 hover:border-my_l_green text-[#000]'
        }
        return baseStyle + 'text-green-600 opacity-50 cursor-not-allowed'
    }

    // Вспомогательная функция для рендеринга опций select
    const renderOptions = (items: DictionaryItem[] | ColorItem[]) => {
        if (items.length === 0) {
            return <option value="">Загрузка...</option>
        }
        return items.map(item => (
            <option key={item.id} value={item.id}>
                {'code' in item ? `${item.name} (${item.code})` : item.name} {/* Для цвета можно отобразить код */}
            </option>
        ))
    }


    return (
        <form className="bg-white rounded px-8 pt-6 pb-8" action={onSubmit}>
            {/* ID варианта продукта - скрытое поле, если редактируем */}
            <input hidden type="number" name="id" value={productVariant?.id || ''} readOnly/>

            {/*Форма всегда имеет конкретный продукт и без него не существует*/}
            <input hidden type="number" name="productId" value={productId} readOnly/>

            {/* Выбор Цвета */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorId">
                    Цвет:
                </label>
                <select
                    name="colorId"
                    id="colorId"
                    value={colorId}
                    onChange={(e) => setColorId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Выберите цвет</option>
                    {renderOptions(colors)}
                </select>
            </div>

            {/* Поле 'articul' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="articul">
                    Артикул варианта:
                </label>
                <input
                    required
                    value={articul}
                    onBlur={() => setTouchedArticul(true)}
                    onChange={(e) => setArticul(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name='articul'
                    placeholder="Артикул для данного варианта"
                />
                {!isArticulValid() && <span style={{color: 'red'}}>Артикул не может быть пустым.</span>}
            </div>

            {/* Чекбокс 'isActive' */}
            <div className="mb-4 flex items-center">
                <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="mr-2 leading-tight"
                />
                <label htmlFor="isActive" className="text-gray-700 text-sm font-bold">
                    Активен (отображать на сайте)
                </label>
            </div>

            {/* Числовые поля */}
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                        Длина (см):
                    </label>
                    <input
                        required
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='length'
                        placeholder="Длина"
                        min="0" // Добавим минимальное значение
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
                        Ширина (см):
                    </label>
                    <input
                        required
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='width'
                        placeholder="Ширина"
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                        Высота (см):
                    </label>
                    <input
                        required
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='height'
                        placeholder="Высота"
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                        Вес (кг):
                    </label>
                    <input
                        required
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='weight'
                        placeholder="Вес"
                        step="0.01" // Для дробных значений, если вес может быть дробным
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="box_length">
                        Длина коробки (см):
                    </label>
                    <input
                        required
                        value={box_length}
                        onChange={(e) => setBoxLength(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='box_length'
                        placeholder="Длина коробки"
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="box_height">
                        Высота коробки (см):
                    </label>
                    <input
                        required
                        value={box_height}
                        onChange={(e) => setBoxHeight(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='box_height'
                        placeholder="Высота коробки"
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="box_weight">
                        Вес коробки (кг):
                    </label>
                    <input
                        required
                        value={box_weight}
                        onChange={(e) => setBoxWeight(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='box_weight'
                        placeholder="Вес коробки"
                        step="0.01" // Для дробных значений
                        min="0"
                    />
                </div>
            </div>

            {/* Поле 'price' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Цена:
                </label>
                <input
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name='price'
                    placeholder="Цена"
                    step="0.01" // Для десятичных значений
                    min="0"
                />
            </div>

            <div className="flex items-center justify-center mt-2">
                <button
                    disabled={!isArticulValid()}
                    className={buttonStyle()}
                    type="submit">Записать
                </button>
            </div>
        </form>
    )
}

export default ProductVariantForm