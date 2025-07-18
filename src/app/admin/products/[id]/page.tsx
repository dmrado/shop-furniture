import Link from 'next/link'
import React from 'react'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {Post} from '@/db/modeladmin/post.model.ts'
import {getServerSession} from 'next-auth'
import {notFound} from 'next/navigation'
import CookieConsent from '@/components/CookieConsent.tsx'
import {getConsentAccepted} from '@/actions/getCookiesAccepted.ts'
import {isAdmin} from '@/actions/isAdmin.ts'
import {ProductModel, ProductVariantModel} from "@/db/models";
import ProductVariantForm from "@/components/admin/ProductVariantForm";
import ProductForm from "@/components/admin/ProductForm";
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

    return (<>
            <div className="max-w-4xl overflow-hidden mx-auto my-32 mb-0 pr-1 pl-1">

                <div
                    className="flex items-center align-c w-full h-full bg-no-repeat bg-center bg-cover bg-fixed text-center overflow-hidden rounded-lg">
                    <img src={product.path ? product.path : '/kofeinii-stolik-elite.webp'}
                         alt="Картинка продукта"/>
                </div>

                <div className="px-5 flex flex-col justify-center items-center text-justify">

                    <h1 className="text-[#505050] text-2xl font-bold p-5">{product.name}</h1>

                    <div className="text-[#505050] text-xl p-5 break-all"
                         dangerouslySetInnerHTML={{__html: product.descriptionShort}}
                    ></div>

                    <p className="justify-end italic p-5 opacity-65">Добавлено:&nbsp;
                        {product.createdAt.toLocaleDateString('ru-RU', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>

                    <div className="flex flex-wrap p-5 justify-between items-center">
                        <Link href={'/admin/products'}>
                            <button className='button_blue'>Вернуться</button>
                        </Link>
                        {/*todo защитить более глобально isAdmin*/}
                        {/*{isAdmin(session) &&*/}
                        {/*        <Link href={`/admin/products/${product.id}`}>*/}
                        {/*            <button className='button_green text-dark'>Редактировать</button>*/}
                        {/*        </Link>*/}
                        {/*}*/}
                    </div>

                    <ProductForm product={product}/>


                    {/*{isAdmin(session) &&*/}
                    <form action={removeProduct.bind(null, product.id)}>
                        <input className='button_red' type='submit' value="Удалить пост"/>
                    </form>
                    {/*}*/}



                </div>

                {variants.map(variant => (<li key={variant.id}>
                    {variant.articul} {variant.colorId}
                </li>))}
               < ProductVariantForm productId={product.id}/>
            </div>
        </>
    )

}

export default Product
