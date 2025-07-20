import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Post } from '@/db/modeladmin/post.model.ts'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import CookieConsent from '@/components/CookieConsent.tsx'
import { getConsentAccepted } from '@/actions/getCookiesAccepted.ts'
import { isAdmin } from '@/actions/isAdmin.ts'
import { ImageModel, ProductModel, ProductVariantModel } from '@/db/models'
import ProductVariantForm from '@/components/admin/ProductVariantForm'
import ProductForm from '@/components/admin/ProductForm'
// import '../tailwind.css'

type ProductPageParams = { params: { id: number } }

const Product = async ({ params }: ProductPageParams) => {
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

    async function removeProduct(id: number) {
        'use server'
        await ProductModel.destroy({ where: { id } })
        revalidatePath('/admin/products')
        redirect('/admin/products')
    };

    async function removeVariant(id: number) {
        'use server'
        const productId = product.id
        console.log('~~~~~~~~~~productId', productId)
        await ProductVariantModel.destroy({ where: { id } })
        revalidatePath(`/admin/products/${productId}`)
        redirect(`/admin/products/${productId}`)
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

            <ProductForm product={product}/>

            {/*Блок вариантов продукта*/}
            {variants.map(variant => (
                <li key={variant.id} className="list-none mb-2">
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between p-2 bg-white rounded-lg shadow-sm">

                        {/* Контейнер для артикула и цвета */}
                        <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <span className="text-gray-700 font-medium">Артикул: {variant.articul}</span>
                            {variant.colorId && (
                                <span className="text-gray-600 text-sm">(Цвет ID: {variant.colorId})</span>
                            )}
                        </div>

                        {/* Контейнер для кнопок "Редактировать" и "Удалить" */}
                        <div
                            className="flex items-center gap-2 flex-shrink-0"> {/* Добавил flex-col sm:flex-row items-center gap-2 */}

                            <Link href={`/admin/variants/edit/${variant.id}`}>
                                <button className="button_blue px-4 py-2 text-sm w-full sm:w-auto">Редактировать</button>
                            </Link>

                            {/*{isAdmin(session) &&*/}
                            <form action={removeVariant.bind(null, variant.id)} className="w-full sm:w-auto">
                                <button type="submit" className='button_red px-4 py-2 text-sm w-full'>
                                Удалить
                                </button>
                            </form>
                            {/*}*/}

                        </div>
                    </div>
                </li>
            ))}

            <h3 className="text-xl font-bold mt-8 mb-4">Добавить новый вариант продукта</h3>
            <ProductVariantForm productId={product.id}/>
        </div>
    </>
    )

}

export default Product
