'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { handleForm } from '@/actions/handleForm.ts'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
import { ProductDTO } from '@/db/models/product.model.ts'
import { getBrandById, getActiveBrands } from '@/actions/dictionaryActions'
import Modal from '@/components/ui/Modal'
import BrandFormModalContent from '@/components/admin/BrandFormModalContent'
import ProductFormSelectWithActions from '@/components/admin/ProductFormSelectWithActions'

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
    product?: ProductDTO // Может быть не передан при создании нового продукта
    onSuccess?: () => void // Добавляем колбэк для успешного сохранения
    onCancel?: () => void // Добавляем колбэк для отмены

    // Добавляем пропсы для справочников, но делаем их опциональными и даем дефолтное значение
    initialBrands?: DictionaryItem[]
    initialCollections?: DictionaryItem[]
    initialCountries?: DictionaryItem[]
    initialStyles?: DictionaryItem[]
}

// Типы для элементов справочника
type DictionaryItem = {
    id: number
    name: string
    description?: string
    isActive?: boolean
}

// тип для BrandFormState, если его нет в ProductForm
type BrandFormState = {
    id?: number
    name: string
    description: string
    isActive: boolean
}

const ProductForm = ({
    product,
    onSuccess,
    onCancel,
    initialBrands = [],
    initialCollections = [],
    initialCountries = [],
    initialStyles = []
}: ProductFormProps) => {
    console.log('initialBrands', initialBrands)
    console.log('product>>>>>>>>>>>>>>>>>', product)
    // Инициализируем состояния, используя данные из product или значения по умолчанию
    const [ name, setName ] = useState(product?.name || '')
    const [ articul, setArticul ] = useState(product?.articul || '')
    const [ sku, setSku ] = useState(product?.sku || '')
    const [ descriptionShort, setDescriptionShort ] = useState(product?.descriptionShort || '')
    const [ descriptionLong, setDescriptionLong ] = useState(product?.descriptionLong || '')
    const [ isNew, setIsNew ] = useState(product?.isNew || false)
    const [ isActive, setIsActive ] = useState(product?.isActive || false)

    // Инициализируем
    const [ brandId, setBrandId ] = useState<number | string>('') // Должен быть number или string
    const [ collectionId, setCollectionId ] = useState<number | string>('')
    const [ countryId, setCountryId ] = useState<number | string>('')
    const [ styleId, setStyleId ] = useState<number | string>('')

    //  СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ СПИСКОВ СПРАВОЧНИКОВ
    const [ brands, setBrands ] = useState<DictionaryItem[]>(initialBrands)
    const [ collections, setCollections ] = useState<DictionaryItem[]>(initialCollections)
    const [ countries, setCountries ] = useState<DictionaryItem[]>(initialCountries)
    const [ styles, setStyles ] = useState<DictionaryItem[]>(initialStyles)

    // Состояния для валидации
    const [ touchedName, setTouchedName ] = useState(false)
    const [ isFileSizeError, setFileSizeError ] = useState(false)

    //для модального окна
    const [ showBrandModal, setShowBrandModal ] = useState(false)
    // Для передачи данных в модалку при редактировании
    const [ currentBrandForEdit, setCurrentBrandForEdit ] = useState<BrandFormState | null>(null)

    // Функция для перезагрузки списка брендов
    const refreshBrands = async () => {
        try {
            const updatedBrands = await getActiveBrands()
            setBrands(updatedBrands)
        } catch (error) {
            console.error('Ошибка при обновлении списка брендов:', error)
        }
    }

    // Обработчик для кнопки "Добавить бренд"
    const handleAddBrandClick = () => {
        setCurrentBrandForEdit(null) // Важно для сброса формы на "новый бренд"
        setShowBrandModal(true)
    }

    // Обработчик для кнопки "Редактировать бренд"
    const handleEditBrandClick = async () => {
        // Убедитесь, что brandId - это число и он выбран
        if (typeof brandId === 'number' && brandId > 0) {
            try {
                // Загружаем полные данные бренда, включая description и isActive
                const fullBrandData = await getBrandById(brandId)
                if (fullBrandData) {
                    setCurrentBrandForEdit({
                        id: fullBrandData.id,
                        name: fullBrandData.name,
                        description: fullBrandData.description,
                        isActive: fullBrandData.isActive,
                    })
                    setShowBrandModal(true)
                } else {
                    alert('Бренд не найден.')
                }
            } catch (error) {
                alert('Ошибка при загрузке данных бренда.')
                console.error(error)
            }
        } else {
            alert('Пожалуйста, выберите бренд для редактирования.')
        }
    }

    // useEffect для установки начальных значений или обновления при смене product
    useEffect(() => {
        setName(product?.name || '')
        setArticul(product?.articul || '')
        setSku(product?.sku || '')
        setDescriptionShort(product?.descriptionShort || '')
        setDescriptionLong(product?.descriptionLong || '')
        setIsNew(product?.isNew ?? false)
        setIsActive(product?.isActive ?? false)

        // Установка значений для select-ов, учитывая переданные initialItems проверяем, что brands, collections и т.д. не undefined здесь
        setBrandId(product?.brandId ?? '')
        setCollectionId(product?.collectionId ?? '')
        setCountryId(product?.countryId ?? '')
        setStyleId(product?.styleId ?? '')
        // setStyleId(product?.styleId && styles.some(s => s.id === product.styleId) ? product.styleId : (styles.length > 0 ? styles[0].id : ''))

        setTouchedName(false)
        setFileSizeError(false)
    }, [ product, initialBrands, initialCollections, initialCountries, initialStyles ]) // Зависимости должны быть пропсы, а не стейты, которые меняются внутри

    const onSubmit = async (formData: FormData) => {
        try {
            await handleForm(formData)
            if (onSuccess) { // Проверка для TS опциональной функции
                onSuccess() // Вызываем переданный колбэк при успехе
            }
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error)
        }
    }

    // Валидация для 'name'
    const isNameValid = () => !touchedName || (touchedName && name.length >= TITLE_MIN_LENGTH)

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

    //fixme удалить после замены коллекции страны и стиля на соответствующие компоненты ProductFormSelectWithActions
    const renderOptions = (items: DictionaryItem[]) => {
        return items.map((item) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ))
    }

    return (<>
        <form className="bg-white rounded px-1 pt-6 pb-8" action={onSubmit}>
            {/* ID продукта - скрытое поле, если редактируем */}
            <input hidden type="number" name="id" value={product?.id || ''} readOnly/>

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
                        setName(e.target.value)
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name='name'
                    placeholder="Название товарной позиции (мин. 3, макс. 180 символов)"
                    maxLength={180}
                />
                {!isNameValid() &&
                    <span style={{color: 'red'}}>Название должно быть не менее {TITLE_MIN_LENGTH} символов.</span>}
            </div>

            {/* Контейнер для полей в три колонки на md и выше */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                {/* ПОЛЯ SELECT ДЛЯ ID: */}
                <div className="mb-4">

                    <ProductFormSelectWithActions
                        label="бренд"
                        name="brandId"
                        id="brandId"
                        value={brandId}
                        options={brands}
                        onChange={(e) => setBrandId(Number(e.target.value))}
                        onAddClick={handleAddBrandClick} // Передаем обработчик для "Добавить"
                        onEditClick={handleEditBrandClick} // Передаем обработчик для "Редактировать"
                        showEditButton={!!brandId} // Кнопка "Редактировать" активна, если выбран бренд
                    />

                    {/*<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandId">*/}
                    {/*    Бренд:*/}
                    {/*</label>*/}
                    {/*<div*/}
                    {/*    className="flex items-center gap-2"> /!* контейнер select + button+добавить + button+редактировать *!/*/}
                    {/*    <select*/}
                    {/*        name="brandId"*/}
                    {/*        id="brandId"*/}
                    {/*        value={brandId}*/}
                    {/*        onChange={(e) => setBrandId(Number(e.target.value))}*/}
                    {/*        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
                    {/*    >*/}
                    {/*        <option value="">Выберите бренд</option>*/}
                    {/*        {renderOptions(brands)}*/}
                    {/*    </select>*/}

                    {/*    /!* Кнопка "Добавить" с PlusIcon *!/*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"*/}
                    {/*        onClick={() => {*/}
                    {/*            setCurrentBrandForEdit(null) // Сбрасываем для создания нового*/}
                    {/*            setShowBrandModal(true)*/}
                    {/*        }}*/}
                    {/*        title="Добавить новый бренд" // Подсказка при наведении*/}
                    {/*    >*/}
                    {/*        <PlusIcon className="h-5 w-5"/> /!* Иконка плюса *!/*/}
                    {/*    </button>*/}

                    {/*    /!* Кнопка "Редактировать" с PencilIcon *!/*/}
                    {/*    /!* Убедитесь, что brandId выбран, прежде чем отображать кнопку редактирования *!/*/}
                    {/*    {brandId ? ( // Показываем кнопку редактирования только если что-то выбрано*/}
                    {/*        <button*/}
                    {/*            type="button"*/}
                    {/*            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"*/}
                    {/*            onClick={() => {*/}
                    {/*                const selectedBrand = brands.find(b => b.id === brandId)*/}
                    {/*                if (selectedBrand) {*/}
                    {/*                    setCurrentBrandForEdit({*/}
                    {/*                        id: selectedBrand.id,*/}
                    {/*                        name: selectedBrand.name,*/}
                    {/*                        description: selectedBrand?.description, // Вам нужно будет получить полное описание из базы данных*/}
                    {/*                        // если вы хотите его редактировать.*/}
                    {/*                        // Возможно, getBrandById server action*/}
                    {/*                        isActive: selectedBrand?.isActive*/}
                    {/*                    })*/}
                    {/*                    setShowBrandModal(true)*/}
                    {/*                }*/}
                    {/*            }}*/}
                    {/*            title="Редактировать выбранный бренд" // Подсказка при наведении*/}
                    {/*        >*/}
                    {/*            <PencilIcon className="h-5 w-5"/> /!* Иконка карандаша *!/*/}
                    {/*        </button>*/}
                    {/*    ) : null} /!* Если бренд не выбран, кнопку не показываем *!/*/}

                    {/*</div>*/}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionId">
                        Коллекция:
                    </label>
                    <div className="flex items-center gap-2"> {/* контейнер select  + button-добавить */}
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
                        <button
                            type="button"
                            className="shadow appearance-none border rounded bg-gray-200 text-gray-700 flex items-center justify-center w-10 h-10 flex-shrink-0"
                            onClick={() => console.log('Add collection')}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countryId">
                        Страна:
                    </label>
                    <div className="flex items-center gap-2"> {/* контейнер select  + button-добавить */}
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
                        <button
                            type="button"
                            className="shadow appearance-none border rounded bg-gray-200 text-gray-700 flex items-center justify-center w-10 h-10 flex-shrink-0"
                            onClick={() => console.log('Add country  clicked')}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="styleId">
                        Стиль:
                    </label>
                    <div className="flex items-center gap-2"> {/* контейнер select  + button-добавить */}
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
                        <button
                            type="button"
                            className="shadow appearance-none border rounded bg-gray-200 text-gray-700 flex items-center justify-center w-10 h-10 flex-shrink-0"
                            onClick={() => console.log('Add countryId  clicked')}
                        >
                            +
                        </button>
                    </div>
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
                {isFileSizeError && <span style={{color: 'red'}}>Размер файла слишком большой.</span>}
                <label htmlFor="product_picture"
                       className="text-gray-500 mt-1">Пожалуйста выберите файл с расширением .png, .jpeg, .jpg, .gif,
                    .tiff, .heic</label>
            </div>

            <div className="flex items-center justify-center mt-2">
                <button
                    disabled={!isNameValid() || isFileSizeError} // Валидация по имени и размеру файла
                    className={buttonStyle()}
                    type="submit">Записать ✅
                </button>
                {product && ( // Добавляем кнопку отмены только если редактируем
                    <button
                        type="button"
                        onClick={onCancel}
                        className="button_red ml-4"
                    >
                        Отмена 🚫
                    </button>
                )}
            </div>
        </form>
        {showBrandModal && (
            <Modal onClose={() => {
                setShowBrandModal(false)
                // Сброс счетчика символов описания должен быть в BrandFormModalContent
            }}>
                <BrandFormModalContent
                    onClose={() => setShowBrandModal(false)} // Пропс для закрытия модалки
                    onSuccess={refreshBrands} // Вызываем refreshBrands при успешном добавлении/обновлении
                    initialData={currentBrandForEdit} // Передаем данные для редактирования
                />
            </Modal>
        )}
    </>)
}

export default ProductForm