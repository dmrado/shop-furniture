import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants.ts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { isAdmin } from '@/actions/isAdmin.ts'
import { ImageModel, ProductModel, ProductVariantModel, ColorModel } from '@/db/models'
import ProductForm from '@/components/admin/ProductForm'
import ProductVariantManager from '@/components/admin/ProductVariantManager'
// import '../tailwind.css'

type ProductPageParams = { params: { id: number } }

const ProductPage = async ({ params }: ProductPageParams) => {
    const session = await getServerSession()

    const product = await ProductModel.findByPk(params.id)
    if (!product) {
        return notFound()
    }

    const variants = await ProductVariantModel.findAll({
        where: {
            productId: product.id
        }
    })

    const colors = await ColorModel.findAll()

    async function removeProduct(id: number) {
        'use server'
        await ProductModel.destroy({ where: { id } })
        revalidatePath('/admin/products')
        redirect('/admin/products')
    }

    return (<>
        <div className="max-w-4xl mx-auto my-4 p-2 bg-white rounded-lg shadow-sm">
            {/* Основной контейнер для картинки и текста */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                {/* Левая часть: Картинка - теперь намного меньше */}
                <div
                    className="flex-shrink-0 w-24 h-24 sm:w-20 sm:h-20 max-w-[96px] sm:max-w-none rounded-md overflow-hidden border border-gray-200">
                    <Image
                        width={80} /* 240 / 3 = 80 */
                        height={106} /* 320 / 3 = 106.6 (округлил) */
                        src={product.path ? product.path : '/kofeinii-stolik-elite.webp'}
                        alt={`Изображение продукта ${product.name}`}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>

                {/* Правая часть: Название, краткое описание, дата - шрифты уменьшены */}
                <div
                    className="flex-grow flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
                    <h1 className="text-lg sm:text-xl font-bold mb-1 text-[#505050]"> {/* Уменьшил text-2xl/3xl до text-lg/xl, mb-2 до mb-1 */}
                        {product.name}
                    </h1>

                    <div
                        className="text-xs sm:text-sm mb-2 break-words text-[#505050] line-clamp-2" /* Уменьшил text-base/lg до text-xs/sm, mb-4 до mb-2, добавил line-clamp-2 для краткости */
                        dangerouslySetInnerHTML={{ __html: product.descriptionShort }}
                    ></div>

                    <p className="text-gray-500 text-xxs sm:text-xs italic mt-auto"> {/* Уменьшил text-sm до text-xxs/xs */}
                            Добавлено:&nbsp;
                        {product.createdAt.toLocaleDateString('ru-RU', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Блок с кнопками - остается внизу под всей информацией */}
            <div className="flex flex-wrap p-5 justify-center items-center mt-6 border-t pt-4">
                <Link href={'/admin/products'}>
                    <button className='button_blue mr-6'>Вернуться к продуктам</button>
                </Link>

                {/*{isAdmin(session) &&*/}
                <form action={removeProduct.bind(null, product.id)}>
                    <button className='button_red'>
                        <input type='submit' value="Удалить продукт"/>
                    </button>

                </form>
                {/*}*/}
            </div>

            {/*todo защитить более глобально isAdmin*/}
            {/*{isAdmin(session) &&*/}
            {/*        <Link href={`/admin/products/${product.id}`}>*/}
            {/*            <button className='button_green text-dark'>Редактировать</button>*/}
            {/*        </Link>*/}
            {/*}*/}

            {/*Блок вариантов продукта*/}
            {/* клиентский компонент для управления вариантами */}
            <ProductVariantManager
                initialVariants={variants.map(v => v.toJSON())}
                productId={product.id}
                allColors={colors.map(v => v.toJSON())}
                itemsPerPage={NUMBER_OF_PRODUCTS_TO_FETCH}
            />
        </div>
    </>
    )

}

export default ProductPage
