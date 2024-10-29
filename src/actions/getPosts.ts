'use server'
import { Post, PostPreview } from '@/db/modeladmin/post.model.ts'

export const getPosts = async (offset: number, limit: number)
    : Promise<{count: number, posts: Array<PostPreview> }> => {
    try {
        const { rows, count } = await Post.findAndCountAll({
            offset: offset, limit: limit, order: [ [ 'updatedAt', 'DESC' ] ],
            attributes: [ 'id', 'title', 'preview', 'path', 'createdAt' ]
        })
        return {
            posts: rows.map(post => post.toJSON()),
            count: count
        }
    } catch (error: unknown) {
        console.log(error)
        throw new Error(`An error happened: ${error}`)
    }
}