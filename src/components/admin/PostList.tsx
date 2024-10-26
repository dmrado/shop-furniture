'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { PostPreview } from '@/db/post.model'
import PostsPreview from '@/components/admin/PostsPreview.tsx'
import { getPosts } from '@/actions/getPosts.ts'
import { NUMBER_OF_POSTS_TO_FETCH } from '@/app/constants.ts'

export default function PostList({ initialPosts }: { initialPosts: PostPreview[] }) {
    const [ offset, setOffset ] = useState(NUMBER_OF_POSTS_TO_FETCH)
    const [ count, setCount ] = useState(0)
    const [ posts, setPosts ] = useState<PostPreview[]>(initialPosts)
    const { ref, inView } = useInView()

    const loadMorePosts = async () => {
        //присваиваем значение posts в переменную newPosts деструктуризация с переимнованием
        const { posts: newPosts, count } = await getPosts(offset, NUMBER_OF_POSTS_TO_FETCH)
        setPosts([ ...posts, ...newPosts ])
        setOffset(offset + NUMBER_OF_POSTS_TO_FETCH)
        setCount(count)
    }

    useEffect(() => {
        if (inView && posts.length !== count) {
            loadMorePosts()
            //todo обработать ошибку
        }
    }, [ inView ])

    return (
        <div>

            {posts.map((post) =>
                <PostsPreview key={post.id} post={post}/>
            )}

            <div className='flex justify-center my-10 text-my_l_green' ref={ref}>
                {posts.length !== count ? 'Загружаем еще...' : 'Простите, это весь список, больше пока не написали!'}
            </div>
        </div>
    )
}
