import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'
import PostForm from '@/components/PostForm.tsx'
import { isAdmin } from '@/app/isAdmin.ts'
import { isSessionExpired } from '@/app/isSessionExpired.ts'
import { redirect } from 'next/navigation'

const AddPost = async () => {
    const session = await getServerSession()

    if (!session || !isAdmin(session) || isSessionExpired(session)) {
        return redirect('/api/auth/signin')
    }

    return (<>
        <div className="flex justify-center">
            <h1 className="mt-6 pb-2">Создадим новый пост...</h1>
        </div>

        <div className="items-center p-5">
            <PostForm post={{ title: '', text: '' }}/>
            <div className="flex justify-center p-10">
                <Link href={'/posts'}>
                    <button className='button_blue'>Вернуться</button>
                </Link>
            </div>
        </div>
    </>)
}

export default AddPost
