import React from 'react'

const SlugMebelPage = ({ params } : {params: {slug: string}}) => {
    return (
        <div className='flex justify-center text-4xl text-orange-600 font-extrabold'>
            Product slug {params.slug}
            Product id {params.id}
        </div>
    )
}

export default SlugMebelPage