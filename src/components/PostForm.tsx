'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { handleForm } from '@/actions/handleForm.ts'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
const Editor = dynamic(() => import('@/components/Editor.tsx'), {
    ssr: false,
})

const IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/tiff',
    '.heic'
]

type PostForm = {
    title: string;
    text: string;
    id?: number;
}

const PostForm = ({ post }: { post: PostForm }) => {
    const [ title, setTitle ] = useState(post.title)
    const [ touched, setTouched ] = useState(false)
    const [ isFileSizeError, setFileSizeError ] = useState(false)

    const onSubmit = (formData: FormData) => {
        handleForm(formData)
    }

    const isTitleValid = () => !touched || touched && title.length >= TITLE_MIN_LENGTH

    const buttonStyle = () => {
        const baseStyle : string = 'border-2 border-my_white border-solid px-5 py-2 rounded '
        if (isTitleValid() && !isFileSizeError) {
            return baseStyle + 'hover:text-my_l_green hover:border-2 hover:border-my_l_green text-[#000]'
        }
        return baseStyle + 'text-green-600'
    }

    return (
        <form className="bg-white rounded px-8 pt-6 pb-8"
            action={onSubmit}>
            <input hidden type="number" name="id" value={post.id} readOnly/>
            <div className="mb-4">
                <input
                    required
                    value={title}
                    onBlur={() => setTouched(true)}
                    onChange={(e) => {
                        if (e.target?.value) {
                            setTitle(e.target.value)
                        }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" name='title' placeholder="Заголовок не менее 3 и не более 180 символов"/>
                { !isTitleValid() && <span style={{ color: 'red' }}>Error</span> }
            </div>

            <Editor defaultValue={post.text}/>
            <div className="flex flex-col my-4">

                <input type='file' name='post_picture'
                    accept={IMAGE_TYPES.join(',')}
                    onChange={(e) => {
                        if (!e.target.files) return
                        const fileSize = e.target?.files[0]?.size
                        setFileSizeError(fileSize > FILE_LIMIT)
                    }}
                />
                {isFileSizeError && <span style={{ color: 'red' }}>Too big</span>}
                <label htmlFor="title"
                    className="text-gray-500 mt-1">Пожалуйста выберите файл с расширением .png, .jpeg, .jpg, .gif, .tiff, .heic</label>

            </div>
            <div className="flex items-center justify-center mt-2">
                <button
                    disabled={!isTitleValid() || isFileSizeError}
                    className={buttonStyle()}
                    type="submit">Записать
                </button>
            </div>
        </form>)
}

export default PostForm
