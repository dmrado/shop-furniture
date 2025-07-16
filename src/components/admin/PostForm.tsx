
'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { handleForm } from '@/actions/handleForm.ts'
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
    product?: ProductModel; // Может быть не передан при создании нового продукта
}

const ProductForm = ({ product }: ProductFormProps) => {
    // Инициализируем состояния, используя данные из product или значения по умолчанию
    const [ name, setName ] = useState(product?.name || '')
    const [ articul, setArticul ] = useState(product?.articul || '')
    const [ sku, setSku ] = useState(product?.sku || '')
    const [ descriptionShort, setDescriptionShort ] = useState(product?.descriptionShort || '')
    const [ descriptionLong, setDescriptionLong ] = useState(product?.descriptionLong || '') // Соответствует полю 'text' из старой формы
    const [ isNew, setIsNew ] = useState(product?.isNew || false)
    const [ isActive, setIsActive ] = useState(product?.isActive || false)

    // Инициализируем 1, так как 0 может быть невалидным FK
    const [brandId, setBrandId] = useState(product?.brandId || 1);
    const [collectionId, setCollectionId] = useState(product?.collectionId || 1);
    const [countryId, setCountryId] = useState(product?.countryId || 1);
    const [styleId, setStyleId] = useState(product?.styleId || 1);

    // Состояния для валидации
    const [ touchedName, setTouchedName ] = useState(false)
    const [ isFileSizeError, setFileSizeError ] = useState(false)

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
    const generateOptions = () => {
        const options = [];
        for (let i = 1; i <= 10; i++) { // Генерируем опции от 1 до 10
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

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

            {/* НОВЫЕ ПОЛЯ SELECT ДЛЯ ID: */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandId">
                    ID Бренда:
                </label>
                <select
                    name="brandId"
                    id="brandId"
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {generateOptions()}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionId">
                    ID Коллекции:
                </label>
                <select
                    name="collectionId"
                    id="collectionId"
                    value={collectionId}
                    onChange={(e) => setCollectionId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {generateOptions()}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countryId">
                    ID Страны:
                </label>
                <select
                    name="countryId"
                    id="countryId"
                    value={countryId}
                    onChange={(e) => setCountryId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {generateOptions()}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="styleId">
                    ID Стиля:
                </label>
                <select
                    name="styleId"
                    id="styleId"
                    value={styleId}
                    onChange={(e) => setStyleId(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {generateOptions()}
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

// todo удалить в случае корректной работы кода выше ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 'use client'
// import React, { useState } from 'react'
// import dynamic from 'next/dynamic'
// import { handleForm } from '@/actions/handleForm.ts'
// import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
// const Editor = dynamic(() => import('@/components/Editor.tsx'), {
//     ssr: false,
// })
//
// const IMAGE_TYPES = [
//     'image/png',
//     'image/jpeg',
//     'image/gif',
//     'image/tiff',
//     '.heic'
// ]
//
// type PostForm = {
//     title: string;
//     text: string;
//     id?: number;
// }
//
// const PostForm = ({ post }: { post: PostForm }) => {
//     const [ title, setTitle ] = useState(post.title)
//     const [ touched, setTouched ] = useState(false)
//     const [ isFileSizeError, setFileSizeError ] = useState(false)
//
//     const onSubmit = (formData: FormData) => {
//         handleForm(formData)
//     }
//
//     const isTitleValid = () => !touched || touched && title.length >= TITLE_MIN_LENGTH
//
//     const buttonStyle = () => {
//         const baseStyle : string = 'border-2 border-my_white border-solid px-5 py-2 rounded '
//         if (isTitleValid() && !isFileSizeError) {
//             return baseStyle + 'hover:text-my_l_green hover:border-2 hover:border-my_l_green text-[#000]'
//         }
//         return baseStyle + 'text-green-600'
//     }
//
//     return (
//         <form className="bg-white rounded px-8 pt-6 pb-8"
//             action={onSubmit}>
//             <input hidden type="number" name="id" value={post.id} readOnly/>
//             <div className="mb-4">
//                 <input
//                     required
//                     value={title}
//                     onBlur={() => setTouched(true)}
//                     onChange={(e) => {
//                         if (e.target?.value) {
//                             setTitle(e.target.value)
//                         }
//                     }}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     type="text" name='title' placeholder="Название товарной позиции не менее 3 и не более 180 символов"/>
//                 { !isTitleValid() && <span style={{ color: 'red' }}>Error</span> }
//             </div>
//
//             <Editor defaultValue={post.text}/>
//             <div className="flex flex-col my-4">
//
//                 <input type='file' name='post_picture'
//                     accept={IMAGE_TYPES.join(',')}
//                     onChange={(e) => {
//                         if (!e.target.files) return
//                         const fileSize = e.target?.files[0]?.size
//                         setFileSizeError(fileSize > FILE_LIMIT)
//                     }}
//                 />
//                 {isFileSizeError && <span style={{ color: 'red' }}>Too big</span>}
//                 <label htmlFor="title"
//                     className="text-gray-500 mt-1">Пожалуйста выберите файл с расширением .png, .jpeg, .jpg, .gif, .tiff, .heic</label>
//
//             </div>
//             <div className="flex items-center justify-center mt-2">
//                 <button
//                     disabled={!isTitleValid() || isFileSizeError}
//                     className={buttonStyle()}
//                     type="submit">Записать
//                 </button>
//             </div>
//         </form>)
// }
//
// export default PostForm
