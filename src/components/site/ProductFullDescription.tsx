'use client'
import {useState} from 'react'
import QuantitySelector from '@/components/site/QuantitySelector'
import {useCartContext} from '@/components/cart/CartContext'
import Link from "next/link"
import Image from "next/image"
import {Product} from "@/actions/productActions"
import {InstantOrderModal} from "@/components/site/InstantOrderModal";

const ProductFullDescription = ({product}: { product: Product }) => {
    const {addProductToCart} = useCartContext()
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantitySelectorCount, setQuantitySelectorCount] = useState(1)
    const [isCartUpdating, setIsCartUpdating] = useState(false)

    // for InstantOrderModal
    const [isOpenModal, setIsOpenModal] = useState(false)

    // Находим cartRow для текущего продукта
    // const cartRow = cartRows.find(row => row.product.id === product.id) || null
    console.log('>>>> >>product', product)

    const productArray = {
        name: 'Название товара',
        category: 'Категория',
        price: 1999,
        oldPrice: 2499, // опционально
        description: 'Подробное описание товара...',
        images: [
            'url1.jpg',
            'url2.jpg',
            'url3.jpg',
            'url4.jpg'
        ],
        specifications: {
            'Материал': 'Дерево',
            'Размеры': '200x150x75 см',
            'Вес': '25 кг',
            // другие характеристики
        }
    }

    return <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Галерея изображений */}
                    <div className="space-y-4">
                        <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden">
                            <Image
                                src={product.image}
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
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <p className="mt-2 text-sm text-gray-500">{productArray.category}</p>
                        </div>

                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-indigo-600">{product.new_price}₽</div>
                            {product.old_price && (
                                <div className="ml-4 text-xl text-gray-400 line-through">
                                    {product.old_price}₽
                                </div>
                            )}
                        </div>

                        <div className="prose prose-sm text-gray-600">
                            <p>{product.description_2}</p>
                        </div>

                        {/* Выбор количества и кнопки */}
                        <div className="space-y-4 pt-6">
                            <div className="flex items-center space-x-4">
                                <label className="text-gray-700">Количество:</label>
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
                                        className="w-full sm:w-60 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                        Добавить в корзину
                                    </button>
                                </Link>
                                <InstantOrderModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}/>
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className="w-full sm:w-60 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
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
