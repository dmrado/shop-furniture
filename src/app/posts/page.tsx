import PostList from '@/components/PostList.tsx'
import React from 'react'
import { getPosts } from '@/actions/getPosts.ts'
import { NUMBER_OF_POSTS_TO_FETCH } from '@/app/constants.ts'
import CookieConsent from '@/components/CookieConsent.tsx'
import { getConsentAccepted } from '@/actions/getCookiesAccepted.ts'
import HeaderButtons from '@/components/HeaderButtons.tsx'

export const metadata = {
    title: 'Бейт-Иешуа | Блог'
}

const Posts = async () => {
    const isAcceptedCookie = await getConsentAccepted()
    const { posts } = await getPosts(0, NUMBER_OF_POSTS_TO_FETCH)

    return (<>
        {!isAcceptedCookie && <div className="flex justify-center mt-36">
            <CookieConsent isAccepted={!!isAcceptedCookie}/>
        </div>}
        <div className='flex flex-col justify-between items-center mt-32'>

            <img src="img/blog1.webp" alt="Photo" className="h-60 w-60 rounded-full mb-10"/>
            <HeaderButtons/>
            <h1 className='text-[#505050] font-bold text-4xl'>Блог пастора</h1>
            <p className='text-[#505050] font-bold text-2xl mt-6 px-12 indent-12'>

                В этом месте мы собираемся, чтобы искать Божью истину,
                вдохновляться Его словом и делиться любовью Христа.
                Пусть каждый шаг будет направлен Духом Святым,
                и каждая молитва возносится с верой и надеждой.

                Здесь мы обретаем силу для преодоления трудностей,
                и находим радость в служении друг другу.
                Пусть этот блог станет светом на нашем пути,
                и источником благословений для всех, кто ищет Бога.
            </p>
        </div>
        <div className='max-w-2xl overflow-hidden my-0 mr-auto ml-auto'>{/*container*/}
            <div className='flex float-left p-0 mt-9'>{/*card-list*/}
                <PostList initialPosts={posts}/>
            </div>
        </div>
    </>)
}

export default Posts
