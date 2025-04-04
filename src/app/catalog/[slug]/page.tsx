import React from 'react'

//todo подставить сюда всю папку products
const ProductPage = ({ params }: { params: { slug: string} }) => {
    return (
        <div className='flex justify-center text-4xl text-red-700 font-extrabold'>
            Catalog slug: {params.slug}
        </div>
    )
}
export default ProductPage