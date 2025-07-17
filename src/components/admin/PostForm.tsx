'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { handleForm } from '@/actions/handleForm.ts'
import { getBrands, getCollections, getCountries, getStyles } from '@/actions/dictionaryActions.ts'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
import { ProductModel } from '@/db/models/product.model.ts'

const Editor = dynamic(() => import('@/components/admin/Editor.tsx'), {
    ssr: false,
})

const IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/tiff',
    '.heic'
]

// Типы для PostForm меняем на ProductForm, используя ProductModel
type ProductFormProps = {
    product?: ProductModel // Может быть не передан при создании нового продукта
}

// Типы для элементов справочника
type DictionaryItem = {
    id: number
    name: string
}

const ProductForm = ({ product }: ProductFormProps) => {
    // Инициализируем состояния, используя данные из product или значения по умолчанию
    const [ name, setName ] = useState(product?.name || '')
    const [ articul, setArticul ] = useState(product?.articul || '')
    const [ sku, setSku ] = useState(product?.sku || '')
    const [ descriptionShort, setDescriptionShort ] = useState(product?.descriptionShort || '')
    const [ descriptionLong, setDescriptionLong ] = useState(product?.descriptionLong || '')
    const [ isNew, setIsNew ] = useState(product?.isNew || false)
    const [ isActive, setIsActive ] = useState(product?.isActive || false)

    // Инициализируем 1, так как 0 может быть невалидным FK
    const [ brandId, setBrandId ] = useState(product?.brandId || 1)
    const [ collectionId, setCollectionId ] = useState(product?.collectionId || 1)
    const [ countryId, setCountryId ] = useState(product?.countryId || 1)
    const [ styleId, setStyleId ] = useState(product?.styleId || 1)

    //  СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ СПИСКОВ СПРАВОЧНИКОВ
    const [ brands, setBrands ] = useState<DictionaryItem[]>([])
    const [ collections, setCollections ] = useState<DictionaryItem[]>([])
    const [ countries, setCountries ] = useState<DictionaryItem[]>([])
    const [ styles, setStyles ] = useState<DictionaryItem[]>([])

    // Состояния для валидации
    const [ touchedName, setTouchedName ] = useState(false)
    const [ isFileSizeError, setFileSizeError ] = useState(false)


    // useEffect для загрузки данных при монтировании компонента
    useEffect(() => {
        const loadDictionaryData = async () => {
            const [ fetchedBrands, fetchedCollections, fetchedCountries, fetchedStyles ] = await Promise.all([
                getBrands(),
                getCollections(),
                getCountries(),
                getStyles(),
            ])

            setBrands(fetchedBrands)
            setCollections(fetchedCollections)
            setCountries(fetchedCountries)
            setStyles(fetchedStyles)

            // Если продукт существует и у него есть ID, убедимся, что выбранные ID присутствуют в списках иначе, можно установить 1 (или первый доступный ID) если существующего ID нет в списке
            if (product) {
                if (product.brandId && fetchedBrands.some(b => b.id === product.brandId)) {
                    setBrandId(product.brandId)
                } else if (fetchedBrands.length > 0) { // Если не нашли старый ID, выбираем первый
                    setBrandId(fetchedBrands[0].id)
                }

                if (product.collectionId && fetchedCollections.some(c => c.id === product.collectionId)) {
                    setCollectionId(product.collectionId)
                } else if (fetchedCollections.length > 0) {
                    setCollectionId(fetchedCollections[0].id)
                }

                if (product.countryId && fetchedCountries.some(c => c.id === product.countryId)) {
                    setCountryId(product.countryId)
                } else if (fetchedCountries.length > 0) {
                    setCountryId(fetchedCountries[0].id)
                }

                if (product.styleId && fetchedStyles.some(s => s.id === product.styleId)) {
                    setStyleId(product.styleId)
                } else if (fetchedStyles.length > 0) {
                    setStyleId(fetchedStyles[0].id)
                }
            } else {
                // Для нового продукта, если есть данные, выбираем первый доступный ID
                if (fetchedBrands.length > 0) setBrandId(fetchedBrands[0].id)
                if (fetchedCollections.length > 0) setCollectionId(fetchedCollections[0].id)
                if (fetchedCountries.length > 0) setCountryId(fetchedCountries[0].id)
                if (fetchedStyles.length > 0) setStyleId(fetchedStyles[0].id)
            }
        }

        loadDictionaryData()
    }, [ product ]) // Зависимость от product, чтобы обновить значения при изменении продукта (для режима редактирования)

    const onSubmit = (formData: FormData) => {
        handleForm(formData)
    }

    // Валидация для 'name' (аналог 'title')
    const isNameValid = () => !touchedName || (touchedName && name.length >= TITLE_MIN_LENGTH)

    // Стили кнопки submit
    const buttonStyle = () => {
        const baseStyle: string = 'border-2 border-my_white border-solid px-5 py-2 rounded '
        if (isNameValid() && !isFileSizeError) {
            return baseStyle + 'hover:text-my_l_green hover:border-2 hover:border-my_l_green text-[#000]'
        }
        return baseStyle + 'text-green-600 opacity-50 cursor-not-allowed' // Добавил стили для disabled
    }

    // Вспомогательная функция для генерации опций select
    const renderOptions = (items: DictionaryItem[]) => {
        if (items.length === 0) {
            return <option value="">Загрузка...</option>
        }
        return items.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ))
    }

    return (
        <form className="bg-white rounded px-8 pt-6 pb-8" action={onSubmit}>
            {/* ID продукта - скрытое поле, если редактируем */}
            <input hidden type="number" name="id" value={product?.id || ''} readOnly />

            {/* Поле 'name' - аналог старого 'title' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Название товара:
                </label>
                <input
                    required
                    value={name}
                    onBlur={() => setTouchedName(true)}
                    onChange={(e) => {
                        if (e.target?.value) {
                            setName(e.target.value)
                        }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name='name'
                    placeholder="Название товарной позиции (мин. 3, макс. 180 символов)"
                    maxLength={180} // Добавляем ограничение по длине
                />
                {!isNameValid() && <span style={{ color: 'red' }}>Название должно быть не менее {TITLE_MIN_LENGTH} символов.</span>}
            </div>

            {/* ПОЛЯ SELECT ДЛЯ ID: */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandId">
                    Бренд:
                </label>
                <select
                    name="brandId"
                    id="brandId"
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Выберите бренд</option>
                    {renderOptions(brands)}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionId">
                    Коллекция:
                </label>
                <select
                    name="collectionId"
                    id="collectionId"
                    value={collectionId}
                    onChange={(e) => setCollectionId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Выберите коллекцию</option>
                    {renderOptions(collections)}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countryId">
                    Страна:
                </label>
                <select
                    name="countryId"
                    id="countryId"
                    value={countryId}
                    onChange={(e) => setCountryId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Выберите страну</option>
                    {renderOptions(countries)}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="styleId">
                    Стиль:
                </label>
                <select
                    name="styleId"
                    id="styleId"
                    value={styleId}
                    onChange={(e) => setStyleId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Выберите стиль</option>
                    {renderOptions(styles)}
                </select>
            </div>

            {/* Поле 'articul' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="articul">
                    Артикул:
                </label>
                <input
                    value={articul}
                    onChange={(e) => setArticul(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name='articul'
                    placeholder="Артикул товара"
                />
            </div>

            {/* Поле 'sku' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
                    SKU:
                </label>
                <input
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name='sku'
                    placeholder="SKU товара"
                />
            </div>

            {/* Поле 'descriptionShort' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descriptionShort">
                    Краткое описание:
                </label>
                <textarea
                    value={descriptionShort}
                    onChange={(e) => setDescriptionShort(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name='descriptionShort'
                    placeholder="Краткое описание товара"
                    rows={3} // Добавил rows для удобства
                />
            </div>

            {/* Поле 'descriptionLong' - заменяет старое 'text' */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descriptionLong">
                    Полное описание:
                </label>
                <Editor
                    defaultValue={descriptionLong}
                    // Это предположение, что Editor умеет передавать изменения через пропс или реф
                    // Для этой задачи просто передаем defaultValue
                />
            </div>

            {/* Чекбоксы 'isNew' и 'isActive' */}
            <div className="mb-4 flex items-center">
                <input
                    id="isNew"
                    type="checkbox"
                    name="isNew"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="mr-2 leading-tight"
                />
                <label htmlFor="isNew" className="text-gray-700 text-sm font-bold">
                    Новинка
                </label>
            </div>
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

            {/* Поле для загрузки файла (осталось как есть) */}
            <div className="flex flex-col my-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_picture">
                    Изображение товара:
                </label>
                <input type='file' name='product_picture' id='product_picture'
                    accept={IMAGE_TYPES.join(',')}
                    onChange={(e) => {
                        if (!e.target.files) return
                        const fileSize = e.target?.files[0]?.size
                        setFileSizeError(fileSize > FILE_LIMIT)
                    }}
                />
                {isFileSizeError && <span style={{ color: 'red' }}>Размер файла слишком большой.</span>}
                <label htmlFor="product_picture"
                    className="text-gray-500 mt-1">Пожалуйста выберите файл с расширением .png, .jpeg, .jpg, .gif, .tiff, .heic</label>
            </div>

            <div className="flex items-center justify-center mt-2">
                <button
                    disabled={!isNameValid() || isFileSizeError} // Валидация по имени (бывшему title) и размеру файла
                    className={buttonStyle()}
                    type="submit">Записать
                </button>
            </div>
        </form>
    )
}

export default ProductForm