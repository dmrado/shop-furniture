import React from 'react'

const SlugMebelPage = ({ params } : {params: {slug: string}}) => {
    return (
        <div className='flex justify-center text-4xl text-orange-600 font-extrabold'>
            Product id {params.slug}
        </div>
    )
}

export default SlugMebelPage