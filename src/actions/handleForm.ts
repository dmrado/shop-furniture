'use server'

import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { Post } from '@/db/modelsold/post.model.ts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
import fs from 'fs'

class ValidationError extends Error {}

const saveFile = async (file: File): Promise<string> => {
    const buffer = Buffer.from(await file.arrayBuffer())
    const uniqueFilename = uuidv4()
    const fileExtension = '.' + file.name.split('.').pop()
    const uniqueFullFilename = uniqueFilename + fileExtension
    console.log('uniqueFilename with fileExtension', uniqueFullFilename)
    const outputImagePath = `public/img/${uniqueFullFilename}`

    const resizedBuffer = await sharp(buffer)
        .resize(1356, 668)
        .toBuffer().then(buffer => buffer).catch(err => console.error(err))

    if (!resizedBuffer) {
        throw new ValidationError('File format not supported')
    }

    // Сохранение обработанного буфера в файл
    await new Promise<void>((resolve, reject) => {
        fs.writeFile(outputImagePath, resizedBuffer, (err) => {
            if (err) {
                console.error('Error saving the image:', err)
                reject(err)
            }
            console.log('Image saved successfully:', outputImagePath)
            resolve()
        })
    })
    return uniqueFullFilename
}

type PostData = {
        id: number | undefined,
        title: string,
        text: string
    }

const cleanFormData = (formData: FormData): PostData => {
    const id = formData.get('id')
    const title = formData.get('title')
    const text = formData.get('text')
    if (typeof id !== 'string' || typeof title !== 'string' || typeof text !== 'string') {
        throw new ValidationError('Filedata in text fields')
    }
    if (!title || !text) {
        throw new ValidationError('Title or text is null')
    }
    if (title.length < TITLE_MIN_LENGTH) {
        throw new ValidationError('Title too short')
    }
    return { title, text, id: id ? Number(id) : undefined }
}

const cleanFormFile = (formData: FormData): File | undefined => {
    const file = formData.get('post_picture')
    if (file == null) {
        return undefined
    }
    if (typeof file === 'string') {
        throw new ValidationError('Unexpected post_picture in string format')
    }

    if (file.size === 0) {
        return undefined
    }
    if (file.size > FILE_LIMIT) {
        throw new ValidationError(`File is bigger than limit: "${FILE_LIMIT}"`)
    }
    return file
}

export const handleForm = async (formData: FormData) => {
    try {
        const { id, title, text } = cleanFormData(formData)
        const preview = text ? text.replace(/<[^>]+>/g, '').slice(0, 100) : ''//убираем HTML-разметку

        const [ post, isUpdated ] = await Post.upsert({ id: id, title, text, preview })

        const formFile = cleanFormFile(formData)

        if (formFile) {
            const fileName = await saveFile(formFile)
            await Post.update({ path: `/img/${fileName}` }, { where: { id: post.id } })
        }
    } catch (err) {
        console.error('Error on handleForm:  ', err)
        if (err instanceof ValidationError) {
            return redirect('/api/error/?code=400&message=VALIDATION_ERROR')
        }
        return redirect('/api/error/?code=500&message=SERVER_ERROR')
    }
    revalidatePath('/posts')
    redirect('/posts')
}
