'use client'
import React, { useState, useEffect } from 'react'
import { handleProductVariantForm as handleProductVariantFormAction } from '@/actions/handleProductVariantForm.ts'
import { getColors } from '@/actions/dictionaryActions.ts'

// Типы для элементов справочника (Product, Color)
type DictionaryItem = {
    id: number
    name: string
}

type ColorItem = {
    id: number
    name: string
    code?: string
}

type ProductVariantFormProps = {
    productVariant?: any // Может быть не передан при создании нового варианта, используем 'any' для гибкости
    productId: number
    onSuccess?: () => void //функция, вызываемая при успешной отправке
    onCancel?: () => void // функция, вызываемая при отмене редактирования
}

const ProductVariantForm = ({ productVariant, productId, onSuccess, onCancel }: ProductVariantFormProps) => {
    console.log('ProductVariantForm received productVariant:', productVariant)

    // Инициализируем состояния, используя данные из productVariant или значения по умолчанию
    // Используем ?? '' для числовых полей, чтобы избежать 0 при отсутствии значения
    const [ isActive, setIsActive ] = useState(productVariant?.isActive ?? true)
    const [ articul, setArticul ] = useState(productVariant?.articul ?? '')

    // ID внешних ключей
    const [ colorId, setColorId ] = useState(productVariant?.colorId ?? '') // Используем '' для пустого/невыбранного

    // Числовые поля - могут быть числом или пустой строкой
    const [ length, setLength ] = useState<number | ''>(productVariant?.length ?? '')
    const [ width, setWidth ] = useState<number | ''>(productVariant?.width ?? '')
    const [ height, setHeight ] = useState<number | ''>(productVariant?.height ?? '')
    const [ box_length, setBoxLength ] = useState<number | ''>(productVariant?.box_length ?? '')
    const [ box_height, setBoxHeight ] = useState<number | ''>(productVariant?.box_height ?? '')
    const [ box_weight, setBoxWeight ] = useState<number | ''>(productVariant?.box_weight ?? '')
    const [ weight, setWeight ] = useState<number | ''>(productVariant?.weight ?? '')
    const [ price, setPrice ] = useState<number | ''>(productVariant?.price ?? '')

    // Состояния для хранения списков справочников
    const [ colors, setColors ] = useState<ColorItem[]>([])

    // Состояния для валидации
    const [ touchedArticul, setTouchedArticul ] = useState(false)
    const isArticulValid = () => !touchedArticul || (touchedArticul && articul.length > 0) // Простая валидация

    // useEffect для загрузки данных при монтировании компонента
    useEffect(() => {
        const loadDictionaryData = async () => {
            const fetchedColors = await getColors()
            setColors(fetchedColors)

            // Установка выбранных значений для редактирования
            if (productVariant?.colorId) {
                if (fetchedColors.some(c => c.id === productVariant.colorId)) {
                    setColorId(productVariant.colorId)
                } else if (fetchedColors.length > 0) {
                    setColorId(fetchedColors[0].id) // Fallback
                }
            } else if (!productVariant && fetchedColors.length > 0) {
                // Для нового варианта, если есть данные, выбираем первый доступный ID
                setColorId(fetchedColors[0].id)
            }
        }
        loadDictionaryData()
    }, []) // Зависимость от productVariant убрана, т.к. данные загружаются один раз

    // useEffect для сброса состояния формы при смене productVariant (когда выбирают другой вариант для редактирования или сбрасывают форму)
    useEffect(() => {
        setIsActive(productVariant?.isActive ?? false)
        setArticul(productVariant?.articul ?? '')
        setColorId(productVariant?.colorId ?? (colors.length > 0 ? colors[0].id : '')) // Учитываем загруженные цвета при сбросе
        setLength(productVariant?.length ?? '')
        setWidth(productVariant?.width ?? '')
        setHeight(productVariant?.height ?? '')
        setBoxLength(productVariant?.box_length ?? '')
        setBoxHeight(productVariant?.box_height ?? '')
        setBoxWeight(productVariant?.box_weight ?? '')
        setWeight(productVariant?.weight ?? '')
        setPrice(productVariant?.price ?? '')
        setTouchedArticul(false) // Сбрасываем состояние валидации при смене варианта
    }, [ productVariant, colors ]) // Зависимость от productVariant и colors

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Предотвращаем дефолтную отправку формы

        if (!isArticulValid()) {
            console.error('Артикул не может быть пустым.')
            return
        }

        const formData = new FormData(e.currentTarget)

        // Добавляем/обновляем числовые поля и isActive в FormData, так как их value управляется useState
        formData.set('length', String(length))
        formData.set('width', String(width))
        formData.set('height', String(height))
        formData.set('box_length', String(box_length))
        formData.set('box_height', String(box_height))
        formData.set('box_weight', String(box_weight))
        formData.set('weight', String(weight))
        formData.set('price', String(price))
        formData.set('isActive', String(isActive)) // 'true' или 'false'

        // Убедимся, что productId всегда установлен
        formData.set('productId', String(productId))
        // Убедимся, что id установлен для обновления
        if (productVariant?.id) {
            formData.set('id', String(productVariant.id))
        } else {
            formData.delete('id') // Убедимся, что id нет для создания нового
        }

        try {
            await handleProductVariantFormAction(formData) // Вызываем Server Action
            if (onSuccess) {
                onSuccess() // Вызываем переданный колбэк при успехе
            }
        } catch (error) {
            console.error('Ошибка при сохранении варианта:', error)
            // Можно добавить отображение ошибки пользователю
        }
    }

    const buttonStyle = () => {
        // Базовый класс для кнопки
        let classes = 'button_green'
        // классы для неактивного состояния, если артикул не валиден
        if (!isArticulValid()) {
            classes += ' opacity-50 cursor-not-allowed'
        }
        return classes
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

    // ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ЦЕНЫ
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        // Заменяем все запятые на точки
        value = value.replace(/,/g, '.')
        // Проверяем, если значение пустое, устанавливаем '', иначе преобразуем в число
        setPrice(value === '' ? '' : Number(value))
    }

    return (
        <form className="bg-white rounded px-8 pt-6 pb-8" onSubmit={onSubmit}> {/* Используем onSubmit для client-side */}
            {/* ID варианта продукта - скрытое поле, если редактируем */}
            {/* id будет добавляться в formData вручную в onSubmit */}
            {/* productId также будет добавляться в formData вручную */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Цена (руб):
                    </label>
                    <input
                        required
                        value={price}
                        onChange={handlePriceChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="price"
                        placeholder="125.32"
                        step="0.01"
                        min="0"
                    />
                </div>

            </div>

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
                {productVariant && ( // Показываем кнопку "Отмена" только если productVariant передан (т.е. в режиме редактирования)
                    <button
                        type="button" // Важно: type="button" чтобы не отправлять форму
                        onClick={onCancel}
                        className="button_red ml-4"
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    )
}

export default ProductVariantForm