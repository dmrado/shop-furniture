import ProductFullDescription from '@/components/site/ProductFullDescription'
import { getProductBiId } from '@/actions/productActions'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const ProductPage = async ({ params }: Props) => {

    //todo добавить в таблицу продуктов id зависимость с каталогом

    const id = Number(params.id)
    if (isNaN(id)) {
        return notFound()
    }
    console.log('params', params)

    const product = await getProductBiId(id)

    if (!product) {
        return notFound()
    }

    return <>
        <div className='flex justify-center text-4xl text-red-600 font-extrabold'>
            Product slug &nbsp;<span className="text-green-600">{params.slug}</span>&nbsp;&nbsp;
            Product id &nbsp;<span className="text-green-600">{params.id}</span>
        </div>

        <ProductFullDescription product={product}/>
    </>
}

export default ProductPage
