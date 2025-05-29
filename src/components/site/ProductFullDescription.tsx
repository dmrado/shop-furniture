'use client'
import React, { useEffect, useState } from 'react'
import QuantitySelector from '@/components/site/QuantitySelector'
import { useCartContext } from '@/components/cart/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/actions/productActions'
// import UserAddressForm from '@/components/user/UserAddressForm'
import { InstantOrderForm } from '@/components/site/InstantOrderForm'
import Modal from '@/components/site/Modal'
import { ProductVariantDTO } from '@/db/models/product_variant.model'

const ProductFullDescription = ({ product }: { product: Product }) => {
    const { addProductToCart } = useCartContext()
    const [ selectedImage, setSelectedImage ] = useState(0)
    const [ selectedVariant, setSelectedVariant ] = useState<ProductVariantDTO|null>(null)
    const [ quantitySelectorCount, setQuantitySelectorCount ] = useState(1)
    const [ isCartUpdating, setIsCartUpdating ] = useState(false)

    // for InstantOrderModal
    const [ isOpenModal, setIsOpenModal ] = useState(false)
    useEffect(() => {
        const defaultVariant = product.variants?.[0]
        if (!defaultVariant) return
        setSelectedVariant(defaultVariant)
    }, [ product.id ])
    // Находим cartRow для текущего продукта
    // const cartRow = cartRows.find(row => row.product.id === product.id) || null
    console.log('>>>> >>product', product)

    // const productArray = {
    //     name: 'Название товара',
    //     category: 'Категория',
    //     price: 1999,
    //     oldPrice: 2499, // опционально
    //     description: 'Подробное описание товара...',
    //     images: [
    //         'url1.jpg',
    //         'url2.jpg',
    //         'url3.jpg',
    //         'url4.jpg'
    //     ],
    //     specifications: {
    //         'Материал': 'Дерево',
    //         'Размеры': '200x150x75 см',
    //         'Вес': '25 кг',
    //         // другие характеристики
    //     }
    // }

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
                                        ${selectedImage === index ? 'border-indigo-500' : 'border-transparent'}`}
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
                        <div>
                            <h1 className="text-3xl font-bold text-[#383838]">{product.name}</h1>
                            <p>Categories: </p>
                            <ul>
                                {
                                    product.categories?.length && product.categories.map((category) =>
                                        (<li key={category.id} className="mt-2 text-sm text-[#383838]">{category.name}</li>)
                                    )
                                }
                            </ul>

                        </div>
                        <select
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={selectedVariant?.id}
                            onChange={(e) => {
                                console.log('event.target.value: ', e.target.value, typeof e.target.value)
                                const variant = product.variants.find(
                                    variant => variant.id === Number(e.target.value)) ?? null
                                console.log('variant: ', variant)
                                setSelectedVariant(variant)
                            }}
                        >
                            {product.variants && product.variants.map(variant => (
                                <option key={variant.id} value={variant.id}>
                                    <p>Размеры: {variant.width}x{variant.length}. Цена: {variant.price}</p>
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center">
                            Min: <div className="text-3xl font-bold text-[#383838]">{minPrice}₽</div>
                            Cur: <div className="text-3xl font-bold text-[#383838]">{selectedVariant?.price}₽</div>
                            <div className="ml-4 text-xl text-gray-400 line-through">
                                {minPrice / 0.9}₽
                            </div>
                        </div>

                        <div className="prose prose-sm text-[#383838]">
                            <p>{product.descriptionLong}</p>
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

                                <Link href="#" className="w-full sm:w-auto">
                                    <button
                                        onClick={async () => {
                                            setIsCartUpdating(true)
                                            await addProductToCart(product.id, quantitySelectorCount)
                                            setIsCartUpdating(false)
                                        }}
                                        className="w-full sm:w-60 border border-[#E99C28] text-[#383838] hover:text-white px-6 py-3  font-medium hover:bg-[#E99C28] transition-colors duration-200 cursor-pointer">
                                        Добавить в корзину
                                    </button>
                                </Link>

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
