'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { handleForm } from '@/actions/handleForm.ts'
import {
    // FILE_LIMIT,
    TITLE_MIN_LENGTH
} from '@/app/constants.ts'
import { ProductDTO } from '@/db/models/product.model.ts'
import {
    getBrandById,
    getActiveBrands,
    getCollectionById,
    getCountryById,
    getStyleById,
    getActiveCollections,
    getActiveCountries,
    getActiveStyles,
    getAllCategories,
    getCategoryByProductid
} from '@/actions/dictionaryActions'
import Modal from '@/components/ui/Modal'
import ProductFormSelect from '@/components/admin/ProductFormSelect'
import BrandFormModalContent from '@/components/admin/BrandFormModalContent'
import CollectionFormModalContent from '@/components/admin/CollectionFormModalContent'
import CountryFormModalContent from '@/components/admin/CountryFormModalContent'
import StyleFormModalContent from '@/components/admin/StyleFormModalContent'
import { DictionaryItem, ModalState } from '@/db/types/common-types'
import { addHandler, editHandler } from '@/app/handlers/productFormHandlers'
import ProductImagePicker from '@/components/ui/ProductImagePicker'
import { ImageDTO } from '@/db/models/image.model'
import SelectWithOptions from '@/components/site/SelectWithOptions'
import Link from 'next/link'

const Editor = dynamic(() => import('@/components/admin/Editor.tsx'), {
    ssr: false
})

// const IMAGE_TYPES = [
//     'image/png',
//     'image/jpeg',
//     'image/gif',
//     'image/tiff',
//     '.heic'
// ]

// Типы для PostForm меняем на ProductForm, используя ProductModel
type ProductFormProps = {
    product?: ProductDTO // Может быть не передан при создании нового продукта
    onSuccess?: () => void // Добавляем колбэк для успешного сохранения
    onCancel?: () => void // Добавляем колбэк для отмены

    // Добавляем пропсы для справочников, но делаем их опциональными и даем дефолтное значение
    initialBrands?: DictionaryItem[]
    initialCollections?: DictionaryItem[]
    initialCountries?: DictionaryItem[]
    initialStyles?: DictionaryItem[]
    initialCategories?: DictionaryItem[]
}

const ProductForm = ({
    product,
    onSuccess,
    onCancel,
    initialBrands = [],
    initialCollections = [],
    initialCountries = [],
    initialStyles = [],
    initialCategories = []
}: ProductFormProps) => {
    console.log('initialBrands', initialBrands)
    console.log('product>>>>>>>>>>>>>>>>>', product)

    // Инициализируем состояния, используя данные из product или значения по умолчанию
    const [name, setName] = useState(product?.name || '')
    const [articul, setArticul] = useState(product?.articul || '')
    const [sku, setSku] = useState(product?.sku || '')
    const [descriptionShort, setDescriptionShort] = useState(product?.descriptionShort || '')
    const [descriptionLong, setDescriptionLong] = useState(product?.descriptionLong || '')
    const [isNew, setIsNew] = useState(product?.isNew || false)
    const [isActive, setIsActive] = useState(product?.isActive || false)
    const [productImages, setProductImages] = useState<ImageDTO[]>(product?.images || [])
    const [category, setCategory] = useState(product?.categories || [])

    // Инициализируем
    const [brandId, setBrandId] = useState<number | string>('') // Должен быть number или string
    const [collectionId, setCollectionId] = useState<number | string>('')
    const [countryId, setCountryId] = useState<number | string>('')
    const [styleId, setStyleId] = useState<number | string>('')
    const [categoryId, setCategoryId] = useState<number | string>('')

    //  СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ СПИСКОВ СПРАВОЧНИКОВ
    const [brands, setBrands] = useState<DictionaryItem[]>(initialBrands)
    const [collections, setCollections] = useState<DictionaryItem[]>(initialCollections)
    const [countries, setCountries] = useState<DictionaryItem[]>(initialCountries)
    const [styles, setStyles] = useState<DictionaryItem[]>(initialStyles)
    const [categories, setCategories] = useState<DictionaryItem[]>(initialCategories)

    // Состояния для валидации
    const [touchedName, setTouchedName] = useState(false)
    const [isFileSizeError, setFileSizeError] = useState(false)

    // Универсальный стейт для модального окна
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        type: null,
        initialData: null
    })

    const searchCategory = async () => {
        await getCategoryByProductid(product?.id)
    }

    // Находим категорию по id продукта
    useEffect(() => {
        const editingCategory = searchCategory()
        setCategoryId(editingCategory)
    }, [product])

    // Функция для обновления списка брендов
    const refreshBrands = async () => {
        try {
            const updatedBrands = await getActiveBrands()
            setBrands(updatedBrands)
        } catch (error) {
            console.error('Ошибка при обновлении списка брендов:', error)
        }
    }

    // Функция для обновления списка коллекций
    const refreshCollections = async () => {
        try {
            const updatedCollections = await getActiveCollections() // Используем вашу функцию
            setCollections(updatedCollections)
        } catch (error) {
            console.error('Ошибка при обновлении списка коллекций:', error)
        }
    }

    // Функция для обновления списка стран
    const refreshCountries = async () => {
        try {
            const updatedCountries = await getActiveCountries() // Используем вашу функцию
            setCountries(updatedCountries)
        } catch (error) {
            console.error('Ошибка при обновлении списка стран:', error)
        }
    }

    // Функция для обновления списка стилей
    const refreshStyles = async () => {
        try {
            const updatedStyles = await getActiveStyles() // Используем вашу функцию
            setStyles(updatedStyles)
        } catch (error) {
            console.error('Ошибка при обновлении списка стилей:', error)
        }
    }

    // Функция для обновления списка категорий не требуется пока так как не будет меняться из формы ввиду чувствительности данных на странице посетителя сайта
    // const refreshCategories = async () => {
    //     try {
    //         const updatedCategories = await getAllCategories()
    //         setCategories(updatedCategories)
    //     } catch (error) {
    //         console.error('Ошибка при обновлении списка категорий:', error)
    //     }
    // }

    // useEffect для установки начальных значений или обновления при смене product
    useEffect(() => {
        setName(product?.name || '')
        setArticul(product?.articul || '')
        setSku(product?.sku || '')
        setDescriptionShort(product?.descriptionShort || '')
        setDescriptionLong(product?.descriptionLong || '')
        setIsNew(product?.isNew ?? false)
        setIsActive(product?.isActive ?? false)
        setCategories(product?.category || '')

        // Установка значений для select-ов, учитывая переданные initialItems проверяем, что brands, collections и т.д. не undefined здесь
        setBrandId(product?.brandId ?? '')
        setCollectionId(product?.collectionId ?? '')
        setCountryId(product?.countryId ?? '')
        setStyleId(product?.styleId ?? '')
        setCategories(product?.categoryId ?? '')
        // setStyleId(product?.styleId && styles.some(s => s.id === product.styleId) ? product.styleId : (styles.length > 0 ? styles[0].id : ''))

        setTouchedName(false)
        setFileSizeError(false)
    }, [
        product,
        initialBrands,
        initialCollections,
        initialCountries,
        initialStyles,
        initialCategories
    ]) // Зависимости должны быть пропсы, а не стейты, которые меняются внутри

    const onSubmit = async (formData: FormData) => {
        formData.delete('file') // Удаляем поле файл, так как они уже загружены и мы передаем их айдишники
        try {
            await handleForm(formData)
            if (onSuccess) {
                // Проверка для TS опциональной функции
                onSuccess() // Вызываем переданный колбэк при успехе
            }
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error)
            alert(`Ошибка при сохранении продукта: ${error.message}`)
        }
    }

    // Валидация для 'name'
    const isNameValid = () => !touchedName || (touchedName && name.length >= TITLE_MIN_LENGTH)

    const productFormSelect = [
        {
            label: 'Бренд',
            name: 'brandId',
            id: 'brandId',
            value: brandId,
            options: brands,
            onChange: (e) => setBrandId(Number(e.target.value)),
            onAddClick: () => addHandler('brand', setModalState),
            onEditClick: () => editHandler(brandId, 'brand', setModalState, getBrandById),
            showEditButton: !!brandId,
            href: 'brands'
        },
        {
            label: 'Коллекция',
            name: 'collectionId',
            id: 'collectionId',
            value: collectionId,
            options: collections,
            onChange: (e) => setCollectionId(Number(e.target.value)),
            onAddClick: () => addHandler('collection', setModalState),
            onEditClick: () =>
                editHandler(collectionId, 'collection', setModalState, getCollectionById),
            showEditButton: !!collectionId,
            href: 'collections'
        },
        {
            label: 'Страна',
            name: 'countryId',
            id: 'countryId',
            value: countryId,
            options: countries,
            onChange: (e) => setCountryId(Number(e.target.value)),
            onAddClick: () => addHandler('country', setModalState),
            onEditClick: () => editHandler(countryId, 'country', setModalState, getCountryById),
            showEditButton: !!countryId,
            href: 'countries'
        },
        {
            label: 'Стиль',
            name: 'styleId',
            id: 'styleId',
            value: styleId,
            options: styles,
            onChange: (e) => setStyleId(Number(e.target.value)),
            onAddClick: () => addHandler('style', setModalState),
            onEditClick: () => editHandler(styleId, 'style', setModalState, getStyleById),
            showEditButton: !!styleId,
            href: 'styles'
        }
    ]

    // Стили кнопки submit
    const buttonStyle = () => {
        // Базовые стили для кнопки "Записать", всегда будут применяться button_green
        let classes = 'button_green px-5 py-2' // Используем button_green и необходимые padding

        if (!isNameValid() || isFileSizeError) {
            // Добавляем стили для неактивного состояния
            classes += ' opacity-50 cursor-not-allowed'
        }
        return classes
    }

    return (
        <>
            <form className="bg-white rounded px-1 pt-6 pb-8" action={onSubmit}>
                {/* ID продукта - скрытое поле, если редактируем */}
                <input hidden type="number" name="id" value={product?.id || ''} readOnly />

                {/* Контейнер для полей в две колонки на md и выше */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Поле 'name' - аналог старого 'title' */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Название товара:
                        </label>
                        <input
                            required
                            value={name}
                            onBlur={() => setTouchedName(true)}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            placeholder="Название товарной позиции (мин. 3, макс. 180 символов)"
                            maxLength={180}
                        />
                        {!isNameValid() && (
                            <span style={{ color: 'red' }}>
                                Название должно быть не менее {TITLE_MIN_LENGTH} символов.
                            </span>
                        )}
                    </div>

                    {/* Поле 'category'*/}
                    <div className="mb-4">
                        {/* Добавляем селект для категорий */}
                        {/* todo добавить скрытое поле как с react Quill */}
                        <input
                            hidden
                            type="text"
                            name="categoryValue"
                            value={category}
                            readOnly
                        />
                        <div className="flex-grow w-full sm:w-auto">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="category"
                            >
                                Категория товара:
                            </label>

                            <SelectWithOptions
                                options={categories || []}
                                placeholder={'Выбрать категорию'}
                                value={name}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        {/*    <input*/}
                        {/*        required*/}
                        {/*        value={name}*/}
                        {/*        onBlur={() => setTouchedName(true)}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            setCategory(e.target.value)*/}
                        {/*        }}*/}
                        {/*        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
                        {/*        type="text"*/}
                        {/*        name="category"*/}
                        {/*        placeholder="Категория товарной позиции (мин. 3, макс. 180 символов)"*/}
                        {/*        maxLength={180}*/}
                        {/*    />*/}
                    </div>
                </div>

                {/* Контейнер для полей в три колонки на md и выше */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* ПОЛЯ SELECT ДЛЯ ID: */}
                    {productFormSelect.map((fieldProps, index) => (
                        <ProductFormSelect key={index} {...fieldProps} />
                    ))}

                    {/* Поле 'articul' */}
                    <div className="mb-4">
                        <div className="flex flex-row">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="articul"
                            >
                                Артикул:
                            </label>
                        </div>
                        <input
                            required
                            value={articul}
                            onChange={(e) => setArticul(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="articul"
                            placeholder="Артикул товара"
                        />
                    </div>

                    {/* Поле 'sku' */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="sku"
                        >
                            SKU:
                        </label>
                        <input
                            required
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="sku"
                            placeholder="SKU товара"
                        />
                    </div>
                </div>

                {/* Поле 'descriptionShort' */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="descriptionShort"
                    >
                        Краткое описание:
                    </label>
                    <textarea
                        value={descriptionShort}
                        onChange={(e) => setDescriptionShort(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="descriptionShort"
                        placeholder="Краткое описание товара"
                        rows={3} // Добавил rows для удобства
                    />
                </div>

                {/* Поле 'descriptionLong' - заменяет старое 'text' */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="descriptionLong"
                    >
                        Полное описание:
                    </label>
                    <Editor
                        defaultValue={descriptionLong}
                        // Это предположение, что Editor умеет передавать изменения через пропс или реф для этой задачи просто передаем defaultValue
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

                {/* Поле для загрузки файла */}
                <div className="flex flex-col my-4">
                    <ProductImagePicker
                        value={productImages}
                        label="Product images"
                        productName={product?.name ?? 'Unknown product'}
                        onFilesReady={(fileDto) => {
                            // alert(`Uploaded ${fileDto.length} files`)
                            setProductImages(fileDto)
                        }}
                        multiple
                    />
                    {/*<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_picture">*/}
                    {/*    Изображение товара:*/}
                    {/*</label>*/}
                    {/*<input type='file' name='product_picture' id='product_picture'*/}
                    {/*    accept={IMAGE_TYPES.join(',')}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        if (!e.target.files) return*/}
                    {/*        const fileSize = e.target?.files[0]?.size*/}
                    {/*        setFileSizeError(fileSize > FILE_LIMIT)*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*{isFileSizeError && <span style={{ color: 'red' }}>Размер файла слишком большой.</span>}*/}
                    {/*<label htmlFor="product_picture"*/}
                    {/*    className="text-gray-500 mt-1">Пожалуйста выберите файл с расширением .png, .jpeg, .jpg, .gif,*/}
                    {/*    .tiff, .heic</label>*/}
                </div>

                <div className="flex items-center justify-center mt-2">
                    <button
                        disabled={!isNameValid() || isFileSizeError} // Валидация по имени и размеру файла
                        className={buttonStyle()}
                        type="submit"
                    >
                        Записать ✅
                    </button>
                    {product && ( // Добавляем кнопку отмены только если редактируем
                        <button type="button" onClick={onCancel} className="button_red ml-4">
                            Отмена 🚫
                        </button>
                    )}
                </div>
            </form>

            {modalState.isOpen && (
                <Modal onClose={() => setModalState({ ...modalState, isOpen: false })}>
                    {modalState.type === 'brand' && (
                        <BrandFormModalContent
                            onClose={() => setModalState({ ...modalState, isOpen: false })}
                            onSuccess={refreshBrands}
                            initialData={modalState.initialData}
                        />
                    )}
                    {modalState.type === 'collection' && (
                        <CollectionFormModalContent
                            onClose={() => setModalState({ ...modalState, isOpen: false })}
                            onSuccess={refreshCollections}
                            initialData={modalState.initialData}
                        />
                    )}
                    {modalState.type === 'country' && (
                        <CountryFormModalContent
                            onClose={() => setModalState({ ...modalState, isOpen: false })}
                            onSuccess={refreshCountries}
                            initialData={modalState.initialData}
                        />
                    )}
                    {modalState.type === 'style' && (
                        <StyleFormModalContent
                            onClose={() => setModalState({ ...modalState, isOpen: false })}
                            onSuccess={refreshStyles}
                            initialData={modalState.initialData}
                        />
                    )}
                </Modal>
            )}
        </>
    )
}

export default ProductForm
