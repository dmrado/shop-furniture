import PostList from '@/components/admin/PostList.tsx'
import React from 'react'
import { getPosts } from '@/actions/getPosts.ts'
import { NUMBER_OF_POSTS_TO_FETCH } from '@/app/constants.ts'
import CookieConsent from '@/components/CookieConsent.tsx'
import { getConsentAccepted } from '@/actions/getCookiesAccepted.ts'
import HeaderButtons from '@/components/admin/HeaderButtons.tsx'

export const metadata = {
    title: 'Decoro | админ'
}

const Posts = async () => {
    const isAcceptedCookie = await getConsentAccepted()
    // const { posts } = await getPosts(0, NUMBER_OF_POSTS_TO_FETCH)

    return (<>
        {!isAcceptedCookie && <div className="flex justify-center mt-36">
            <CookieConsent isAccepted={!!isAcceptedCookie}/>
        </div>}
        <div className='flex flex-col justify-between items-center mt-32'>
            <HeaderButtons/>

            <p className='text-[#505050] font-bold text-2xl mt-6 px-12 indent-12'>
                На этой странице осуществляется ввод товарных позиций
            </p>
        </div>
        <div className='max-w-2xl overflow-hidden my-0 mr-auto ml-auto'>{/*container*/}
            <div className='flex float-left p-0 mt-9'>{/*card-list*/}
                {/*<PostList initialPosts={posts}/>*/}
            </div>
        </div>
    </>)
}

export default Posts
