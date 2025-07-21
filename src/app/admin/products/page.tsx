import PostList from '@/components/admin/PostList.tsx'
import React from 'react'
import { getPosts } from '@/actions/getPosts.ts'
import { NUMBER_OF_POSTS_TO_FETCH } from '@/app/constants.ts'
import CookieConsent from '@/components/CookieConsent.tsx'
import { getConsentAccepted } from '@/actions/getCookiesAccepted.ts'
import HeaderButtons from '@/components/admin/HeaderButtons.tsx'
import { ProductModel } from '@/db/models'

export const metadata = {
    title: 'Decoro | Список продукции'
}

const ProductList = async () => {
    const isAcceptedCookie = await getConsentAccepted()
    // const { admin } = await getPosts(0, NUMBER_OF_POSTS_TO_FETCH)

    const products = await ProductModel.findAll({
        order: [ [ 'updatedAt', 'DESC' ] ]
    })

    return (<>
        {!isAcceptedCookie && <div className="flex justify-center mt-36">
            <CookieConsent isAccepted={!!isAcceptedCookie}/>
        </div>}
        <h1 className='flex flex-col text-[#505050] font-bold text-2xl justify-center items-center mt-2'> Все товарные позиции </h1>
        <div className='flex flex-col justify-between items-center mt-2'>
            <HeaderButtons/>
            <div className='text-[#505050] mt-6 px-12 indent-12'>

                <ul>
                    {products.map(product => (
                        <li key={product.id} className="decoration-0">
                            {product.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className='max-w-2xl overflow-hidden my-0 mr-auto ml-auto'>{/*container*/}
            <div className='flex float-left p-0 mt-9'>{/*card-list*/}
                {/*<PostList initialPosts={admin}/>*/}
            </div>
        </div>
    </>)
}

export default ProductList