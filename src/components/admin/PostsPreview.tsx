import React from 'react'
import Link from 'next/link'
import { PostPreview } from '@/db/modelsold/post.model'

const PostsPreview = ({ post }: { post: PostPreview }) => {
    // console.log('post on PostsPreview', post)
    return <li>
        <div className="flex flex-col mt-20 h-full px-0 py-30 content-center items-center">{/*card*/}

            <div className="overflow-hidden h-full rounded-lg">{/*card wrapper для эффекта hover-scale картинки*/}
                <img className="transform hover:scale-150 ease-in-out duration-700 w-full max-h-full rounded-lg"
                    src={post.path ? post.path : 'img/cloudsWIDE.webp'} alt="Post image"/>{/*card-img*/}
            </div>

            <div
                className="flex flex-col justify-between h-52 sm:h-60 w-96 md:w-[24rem] min-h-40 -mt-4 sm:-mt-24 z-10 p-3 overflow-hidden bg-indigo-50  ease-in-out duration-300 border-t-8 border-transparent hover:border-t-8 hover:border-[#004E98]">{/*card-body*/}
                <h5 className="text-center text-blue-950 font-semibold mt-4">
                    <Link
                        className="w-12 p-2 !text-[#004E98] hover:!text-orange-500 transform hover:scale-150 ease-in-out duration-300 text-2xl"
                        href={`/posts/${post.id}`}>{post.title?.slice(0, 45)}...</Link>
                </h5>
                <p className="text-justify text-blue-950 px-2 break-all">&nbsp;{post.preview}...</p>

                <p className="text-end text-blue-950 italic pr-2">Опубликовано:&nbsp;
                    {post.createdAt?.toLocaleDateString('ru-RU', {
                        // weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
    </li>
}

export default PostsPreview
