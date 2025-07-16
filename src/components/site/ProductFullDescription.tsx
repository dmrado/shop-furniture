'use client'
import React, {useEffect, useState} from 'react'
import QuantitySelector from '@/components/site/QuantitySelector'
import {useCartContext} from '@/components/cart/CartContext'
import Link from 'next/link'
import Image from 'next/image'
// import UserAddressForm from '@/components/user/UserAddressForm'
import {InstantOrderForm} from '@/components/site/InstantOrderForm'
import Modal from '@/components/site/Modal'
import {Product} from '@/actions/productActions'
import {ProductVariantDTO} from '@/db/models/product_variant.model'
import {useRouter} from 'next/navigation'
import {UnauthorizedError} from "@/errors";

const ProductFullDescription = ({product}: { product: Product }) => {
    const router = useRouter()
    const {addProductToCart} = useCartContext()
    // const [ selectedImage, setSelectedImage ] = useState(0)

    // for select Variants with useMemo ==========================================
    // хранят выбранное значение свойств
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null)
    const [selectedLength, setSelectedLength] = useState<number | null>(null)

    // Отфильтрованные варианты на основе свойств выше
    const filteredVariants: ProductVariantDTO[] = product.variants
        .filter(variant => selectedColorId === null || variant.colorId === selectedColorId)
        .filter(variant => selectedLength === null || variant.length === selectedLength)

    const allColors = filteredVariants.map(variant => ({id: variant.color.id, label: variant.color.code}))

    const uniqueColors = Object.values(
        allColors.reduce((acc, obj) => {
            acc[obj.id] = obj
            return acc
        }, {})
    )

    const allLength = Array.from(new Set(filteredVariants.map(variant => variant.length)))
        .map(length => ({id: length, label: length}))

    // хранит финально выбранный пользователем вариант продукта по умолчанию первый
    const [selectedVariant, setSelectedVariant] = useState<ProductVariantDTO | null>(product.variants[0] || null)
    console.log('selectedVariant', selectedVariant)
    //============================================================================

    const [quantitySelectorCount, setQuantitySelectorCount] = useState(1)
    const [isCartUpdating, setIsCartUpdating] = useState(false)

    // for InstantOrderModal
    const [isOpenModal, setIsOpenModal] = useState(false)

    // useEffect(() => {
    //     const defaultVariant = product.variants?.[0]
    //     if (!defaultVariant) return
    //     setSelectedVariant(defaultVariant)
    // }, [product.id])

    // *** ЕДИНСТВЕННЫЙ useEffect ДЛЯ СИНХРОНИЗАЦИИ selectedVariant ***
    // Этот useEffect теперь отвечает за:
    // 1. Установку selectedVariant при первом появлении filteredVariants (т.е. когда product загружен и есть варианты).
    // 2. Сброс selectedVariant, если filteredVariants становится пустым.
    // 3. Обновление selectedVariant, если текущий выбранный вариант "выпал" из отфильтрованного списка.
    useEffect(() => {
        // Условие 1: Если filteredVariants пуст, сбрасываем selectedVariant на null.
        if (filteredVariants.length === 0) {
            setSelectedVariant(null)
            return
        }

        // Условие 2:
        // Если selectedVariant равен null (это будет при первом рендере или после сброса),
        // ИЛИ если текущий selectedVariant больше не содержится в filteredVariants
        // (это происходит, когда пользователь меняет фильтры "Цвет" или "Длина" так,
        // что ранее выбранный вариант больше не подходит).
        if (selectedVariant === null || !filteredVariants.some(v => v.id === selectedVariant.id)) {
            // Устанавливаем первый вариант из отфильтрованного списка как новый selectedVariant.
            setSelectedVariant(filteredVariants[0])
            // Важно: здесь мы НЕ трогаем selectedColorId и setSelectedLength,
            // потому что они должны меняться только вручную через их селекты.
        }
        // Если selectedVariant уже установлен и все еще находится в filteredVariants,
        // ничего не делаем. Выбор пользователя сохраняется.
    }, [filteredVariants, selectedVariant]) // Зависимости: изменения filteredVariants или selectedVariant.

    // Находим cartRow для текущего продукта
    // const cartRow = cartRows.find(row => row.product.id === product.id) || null
    // console.log('>>>> >>product', product)

    // todo: temp option
    const minPrice = product.variants
        ? Math.min(...product.variants.map(variant => variant.price))
        : 999

    return <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 ">
                    {/* Галерея изображений */}
                    <div className="space-y-4">
                        <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden">
                            <Image
                                src="/modulnyj-divan.jpg"
                                // src={product.image}
                                alt={product.name}
                                width={500}
                                height={300}
                                priority={false}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {/* <div className="grid grid-cols-4 gap-4">
                            {productArray.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2
                                        ${selectedImage === index ? 'border border-[#E99C28] text-[#383838] cursor-pointer' : 'border-transparent'}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div> */}
                    </div>

                    {/* Информация о товаре */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-[#383838]">{product.name}</h1>
                        <div className="prose prose-sm text-[#383838]">
                            {/*<p>{product.descriptionLong}</p>*/}
                            <div dangerouslySetInnerHTML={{ __html: product.descriptionLong }}/>
                        </div>
                        <div>
                            <h5>Длина: </h5>
                            <select
                                className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-sm hover:border-[#383838] focus:border-[#383838]"
                                value={selectedLength ?? ''}
                                onChange={(e) => {
                                    console.log(' setSelectedLength ', e.target.value)
                                    if (e.target.value === '') {
                                        setSelectedLength(null)
                                        return
                                    }
                                    setSelectedLength(Number(e.target.value))
                                }}
                            >
                                <option value=''>
                                    <p className="mt-2 text-sm text-[#383838]"></p>
                                </option>

                                {allLength.map(length => (
                                    <option key={length.id} value={length.id}>
                                        <p className="mt-2 text-sm text-[#383838]">{length.label}</p>
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <h5>Цвет: </h5>
                            <select
                                className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-sm hover:border-[#383838] focus:border-[#383838]"
                                value={selectedColorId ?? ''}
                                onChange={(e) => {
                                    console.log(' setSelectedColorId ', e.target.value)
                                    if (e.target.value === '') {
                                        setSelectedColorId(null)
                                        return
                                    }
                                    setSelectedColorId(Number(e.target.value))
                                }}
                            >
                                <option value=''>
                                    <p className="mt-2 text-sm text-[#383838]"></p>
                                </option>

                                {uniqueColors.map(color => (
                                    <option key={color.id} value={color.id}>
                                        <p>Цвет: {color.label}</p>
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <h5>Это выбирает КОНКРЕТНЫЙ вариант из ОТФИЛЬТРОВАННЫХ: </h5>
                            <select
                                className="min-w-64 px-2 py-1 bg-gray-50 border border-gray-200 rounded-sm  hover:border-[#383838] focus:border-[#383838]"
                                value={selectedVariant?.id}
                                onChange={(e) => {
                                    console.log('selectedVariant?.id variant.id', e.target.value, typeof e.target.value)
                                    const finalVariant = product.variants.find(variant => variant.id === Number(e.target.value)) ?? null
                                    console.log('finalVariant: ', finalVariant)
                                    setSelectedVariant(finalVariant)
                                }}
                            >
                                {filteredVariants.map(variant => (
                                    <option key={variant.id} value={variant.id}>
                                        <p>Размеры: {variant.width}x{variant.length}.
                                            Цвет: {variant.color.code} Цена: {variant.price}</p>
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/*<div className="flex items-center">*/}
                        {/*    Min: <div className="text-xl font-bold text-[#383838]">{minPrice}₽</div>*/}
                        {/*    Cur: <div className="text-xl font-bold text-[#383838]">{selectedVariant?.price}₽</div>*/}
                        {/*    <div className="ml-4 text-xl text-gray-400 line-through">*/}
                        {/*        {minPrice / 0.9}₽*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*todo from variants size нужна только длина и ширина остальное в описании выведем, потолки у всех выше 2,3 метров*/}
                        {/*<div>*/}
                        {/*    <h5>Размеры : </h5>*/}
                        {/*    <div className="py-4 space-y-4">*/}
                        {/*        <div className="flex gap-2">*/}
                        {/*            /!*todo from variants.length*!/*/}
                        {/*            <input*/}
                        {/*                type="number"*/}
                        {/*                className="w-1/2 border hover:border-[#383838] focus:border-[#383838] text-[#383838] p-2 text-sm"*/}
                        {/*                // placeholder={0}*/}
                        {/*                placeholder="длина"*/}
                        {/*                min={0}*/}
                        {/*                // onInput={() =>updatePriceRange}*/}
                        {/*                v-model="priceMin"*/}
                        {/*            />*/}
                        {/*            /!*todo from variants.width*!/*/}
                        {/*            <input*/}
                        {/*                type="number"*/}
                        {/*                className="w-1/2 border p-2 text-sm"*/}
                        {/*                placeholder="глубина/ширина"*/}
                        {/*                min={0}*/}
                        {/*                // onInput={() => updatePriceRange" v-model="priceMax"}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div className="relative pt-1">*/}
                        {/*            <div className="flex h-2 bg-gray-200 rounded">*/}
                        {/*                <div className="h-2 bg-amber-500 rounded"/>*/}
                        {/*            </div>*/}
                        {/*            <div className="absolute left-0 top-0 h-2 flex items-center">*/}
                        {/*                <div*/}
                        {/*                    className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"*/}
                        {/*                    // onMouseDown={() => startDragging('min')}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <div className="absolute right-0 top-0 h-2 flex items-center">*/}
                        {/*                <div*/}
                        {/*                    className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"*/}
                        {/*                    // onMouseDown={() => startDragging('max')"}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*todo перенести для категорий*/}
                        {/*<div>*/}
                        {/*    <h5>Цена: этот селект не отсюда, а из категорий</h5>*/}
                        {/*    <div className="py-4 space-y-4">*/}
                        {/*        <div className="flex gap-2">*/}
                        {/*            <input*/}
                        {/*                type="number"*/}
                        {/*                className="w-1/2 border hover:border-[#383838] focus:border-[#383838] text-[#383838] p-2 text-sm"*/}
                        {/*                placeholder={0}*/}
                        {/*                min={0}*/}
                        {/*                // onInput={() =>updatePriceRange}*/}
                        {/*                v-model="priceMin"*/}
                        {/*            />*/}
                        {/*            <input*/}
                        {/*                type="number"*/}
                        {/*                className="w-1/2 border p-2 text-sm"*/}
                        {/*                placeholder="8 500 765"*/}
                        {/*                min={0}*/}
                        {/*                // onInput={() => updatePriceRange" v-model="priceMax"}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div className="relative pt-1">*/}
                        {/*            <div className="flex h-2 bg-gray-200 rounded">*/}
                        {/*                <div className="h-2 bg-amber-500 rounded"/>*/}
                        {/*            </div>*/}
                        {/*            <div className="absolute left-0 top-0 h-2 flex items-center">*/}
                        {/*                <div*/}
                        {/*                    className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"*/}
                        {/*                    // onMouseDown={() => startDragging('min')}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <div className="absolute right-0 top-0 h-2 flex items-center">*/}
                        {/*                <div*/}
                        {/*                    className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"*/}
                        {/*                    // onMouseDown={() => startDragging('max')"}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div>
                            {/* Дополнительные фильтры */}
                            {/*<div className="space-y-3 mb-6">*/}
                            {/*    /!*todo from products.isNew*!/*/}
                            {/*    <div className="flex items-center">*/}
                            {/*        <input*/}
                            {/*            type="checkbox"*/}
                            {/*            id="inStock"*/}
                            {/*            className="form-checkbox h-4 w-4 text-amber-500"*/}
                            {/*            // onChange={e => applyFilter('inStock', e.target.checked)}*/}
                            {/*        />*/}
                            {/*        <label htmlFor="inStock" className="ml-2 text-sm text-[#383838]">*/}
                            {/*            В наличии*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*todo from именно variants.isActive НЕ products.isActive*/}
                            {/*    <div className="flex items-center">*/}
                            {/*        <input*/}
                            {/*            type="checkbox"*/}
                            {/*            id="new2024"*/}
                            {/*            className="form-checkbox h-4 w-4 text-amber-500"*/}
                            {/*            // onChange={e => applyFilter('new2024', e.target.checked)}*/}
                            {/*        />*/}
                            {/*        <label htmlFor="new2024" className="ml-2 text-sm text-[#383838]">*/}
                            {/*            Новинки 2025*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/* Кнопка сброса фильтров */}
                            <button
                                className="flex items-center text-sm text-[#383838] hover:text-black"
                                onClick={() => {
                                    console.log('clearAllFilters is pushed')
                                    setSelectedColorId(null)
                                    setSelectedLength(null)
                                    setSelectedVariant(null)
                                }}
                            >
                                Очистить все
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Выбор количества и кнопки */}
                        <div className="space-y-4 pt-6">
                            <div className="flex items-center space-x-4">
                                <label className="text-[#383838]">Количество:</label>
                                <QuantitySelector
                                    count={quantitySelectorCount}
                                    onCountChange={async (quantity: number) => {
                                        setQuantitySelectorCount(quantity)
                                    }}
                                    disabled={isCartUpdating}
                                />

                                {/*<div className="flex items-center border border-gray-300 rounded-lg">*/}
                                {/*    <button*/}
                                {/*        onClick={() => setQuantity(Math.max(1, quantity - 1))}*/}
                                {/*        className="px-3 py-2 hover:bg-gray-100"*/}
                                {/*    >*/}
                                {/*        -*/}
                                {/*    </button>*/}
                                {/*    <input*/}
                                {/*        type="number"*/}
                                {/*        min="1"*/}
                                {/*        value={quantity}*/}
                                {/*        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}*/}
                                {/*        className="w-16 text-center border-x border-gray-300 focus:outline-none"*/}
                                {/*    />*/}
                                {/*    <button*/}
                                {/*        onClick={() => setQuantity(quantity + 1)}*/}
                                {/*        className="px-3 py-2 hover:bg-gray-100"*/}
                                {/*    >*/}
                                {/*        +*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>

                            <div
                                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">

                                {/*<Link href="#" className="w-full sm:w-auto">*/}
                                <button
                                    onClick={ async () => {
                                        setIsCartUpdating(true)
                                        if (!selectedVariant) {
                                            throw new Error('Невозможно добавить в корзину: вариант продукта не выбран.')
                                        }
                                        try {
                                            await addProductToCart(selectedVariant.id, quantitySelectorCount)
                                            console.log('Добавлено в корзину ID:', selectedVariant.id, quantitySelectorCount, 'штуки')

                                            setIsCartUpdating(false)
                                        } catch (error) {
                                            if(error instanceof UnauthorizedError) {
                                                router.push('/api/auth/signin')
                                            } else {
                                                throw error
                                            }
                                        }
                                    }
                                    }
                                    disabled={!selectedVariant || isCartUpdating}
                                    className="w-full sm:w-60 border border-[#E99C28] text-[#383838] hover:text-white px-6 py-3  font-medium hover:bg-[#E99C28] transition-colors duration-200 cursor-pointer">
                                    Добавить в корзину
                                </button>
                                {/*</Link>*/}

                                <Modal
                                    isOpenModal={isOpenModal}
                                    onClose={() => setIsOpenModal(false)}
                                    title='Мгновенное оформление заказа'
                                    description='Оформите заказ без регистрации, информация будет отправлена менеджеру, он свяжется для оформления доставки и проведения оплаты.'>

                                    <InstantOrderForm onClose={() => setIsOpenModal(false)}/>
                                </Modal>
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className="w-full sm:w-60 border border-[#E99C28] text-[#383838] hover:text-white px-6 py-3  font-medium hover:bg-[#E99C28] transition-colors duration-200 cursor-pointer">
                                    Купить сейчас
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProductFullDescription
