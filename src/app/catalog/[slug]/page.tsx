import React from 'react'

const ProductPage = ({ params }: { params: { slug: string, id: string } }) => {
    return (
        <div className='flex justify-center text-4xl text-red-700 font-extrabold'>
            Catalog slug: {params.slug}, id: {params.id}
        </div>
    )
}
export default ProductPage