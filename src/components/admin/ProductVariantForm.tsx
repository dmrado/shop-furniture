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
    console.log('productVariant', productVariant)
    // Инициализируем состояния, используя данные из productVariant или значения по умолчанию
    const [ isActive, setIsActive ] = useState(productVariant?.isActive || false)
    const [ articul, setArticul ] = useState(productVariant?.articul || '')

    // ID внешних ключей
    // const [ productId, setProductId ] = useState(productVariant?.productId || 1) // 1 как дефолт
    const [ colorId, setColorId ] = useState(productVariant?.colorId || 1) // 1 как дефолт

    // Числовые поля
    const [ length, setLength ] = useState<number | ''>(productVariant?.length ?? '')
    const [ width, setWidth ] = useState<number | ''>(productVariant?.width ?? '')
    const [ height, setHeight ] = useState<number | ''>(productVariant?.height ?? '')
    const [ box_length, setBoxLength ] = useState<number | ''>(productVariant?.box_length ?? '')
    const [ box_height, setBoxHeight ] = useState<number | ''>(productVariant?.box_height ?? '')
    const [ box_weight, setBoxWeight ] = useState<number | ''>(productVariant?.box_weight ?? '')
    const [ weight, setWeight ] = useState<number | ''>(productVariant?.weight ?? '')
    const [ price, setPrice ] = useState<number | ''>(productVariant?.price ?? '') // Цена может быть десятичной

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


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Поле 'articul' */}
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
                    {!isArticulValid() && <span style={{ color: 'red' }}>Артикул не может быть пустым.</span>}
                </div>
            </div>

            {/*/!* Контейнер для полей в три колонки на md и выше *!/*/}
            {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">*/}

            {/* Числовые поля */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                        Длина (см):
                    </label>
                    <input
                        required
                        value={length}
                        onChange={(e) => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='length'
                        placeholder="Длина"
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
                        Ширина (см):
                    </label>
                    <input
                        required
                        value={width}
                        onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
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
                        onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-shadow-outline"
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
                        onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='weight'
                        placeholder="Вес"
                        step="0.01"
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
                        onChange={(e) => setBoxLength(e.target.value === '' ? '' : Number(e.target.value))}
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
                        onChange={(e) => setBoxHeight(e.target.value === '' ? '' : Number(e.target.value))}
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
                        onChange={(e) => setBoxWeight(e.target.value === '' ? '' : Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='box_weight'
                        placeholder="Вес коробки"
                        step="0.01"
                        min="0"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="box_weight">
                        Цена (руб):
                    </label>
                    <input
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name='price'
                        placeholder="Цена"
                        step="0.01"
                        min="0"
                    />
                </div>
            </div>


            {/* Поле 'Активен' (isActive) - теперь отдельный блок во всю ширину */}
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-gray-600"
                    />
                    <span className="ml-2 text-gray-700 text-sm font-bold">Активен</span>
                </label>
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