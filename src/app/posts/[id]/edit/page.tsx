import { notFound, redirect } from 'next/navigation'
import { Post } from '@/db/modeladmin/post.model.ts'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { isAdmin } from '@/actions/isAdmin.ts'
import { isSessionExpired } from '@/actions/isSessionExpired.ts'
import PostForm from '@/components/admin/PostForm.tsx'
// import '../tailwind.css'

type PostPageParams = { params: { id: number } }

const EditPost = async ({ params }: PostPageParams) => {
    const session = await getServerSession()
    if (!session || !isAdmin(session) || isSessionExpired(session)) {
        return redirect('/api/auth/signin')
    }

    const post = await Post.findByPk(params.id, { attributes: [ 'id', 'title', 'text', 'preview', 'path', 'createdAt', 'updatedAt' ] })
    if (!post) {
        return notFound()
    }

    return <>

        <div className="flex justify-center">
            <h1 className="p-5">Отредактируем по новому...</h1>
        </div>
        <div
            className="flex justify-center">
            <img src={post.path ? post.path : '../img/postspage/cloudsWIDE.webp'}
                alt="Картинка поста"
                className="max-w-xl rounded-md"
            />
        </div>

        <div className="items-center p-5">
            <PostForm post={{ title: post.title, text: post.text, id: post.id }}/>
            <div className="flex justify-center p-10">
                <Link href={'/posts'}>
                    <button className='button_blue'>Вернуться</button>
                </Link>
            </div>
        </div>
    </>
}

export default EditPost
