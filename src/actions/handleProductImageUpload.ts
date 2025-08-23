'use server'

import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
// import { Image, FileModel } from '@/db/models/file.model.ts'
import { ImageModel } from '@/db/models'
import { ImageDTO } from '@/db/models/image.model'
import { FILE_LIMIT } from '@/app/constants'
import fs from 'fs/promises'
import slugify from 'slugify'
import path from 'path'

class ValidationError extends Error {}

const saveFile = async (file: File, productName: string): Promise<string> => {
    const buffer = Buffer.from(await file.arrayBuffer())

    // 1. Создаём "slug" из имени продукта с транслитерацией Пример: "Диван-кровать Венеция" -> "divan-krovat-venetsiia"
    const slug = slugify(productName, {
        lower: true, // перевести в нижний регистр
        strict: true, // удалить специальные символы
        locale: 'ru' // включить правила транслитерации для русского
    })
    // 2. Добавляем короткий уникальный идентификатор (первая часть UUID)
    const uniqueId = uuidv4().split('-')[0]

    // 3. Получаем расширение файла
    const fileExtension = path.extname(file.name)

    // 4. Формируем финальное имя файла
    const uniqueFullFilename = `${slug}-${uniqueId}${fileExtension}`

    const uploadDir = path.join(process.cwd(), 'public', 'img')
    const outputImagePath = path.join(uploadDir, uniqueFullFilename)

    await fs.mkdir(uploadDir, { recursive: true })

    // todo: actually with NextJs <Image/> no need to resize.
    const resizedBuffer = await sharp(buffer)
        .resize(1920, 1080)
        .toFormat('jpeg') // Конвертируем в JPEG
        .toBuffer()
        .catch((err) => {
            console.error(err)
            return undefined
        })

    if (!resizedBuffer) {
        throw new ValidationError(
            'Формат файла не поддерживается или обработка изображения не удалась.'
        )
    }

    await fs.writeFile(outputImagePath, resizedBuffer)
    console.log('Изображение успешно сохранено:', outputImagePath)

    return uniqueFullFilename
}

const cleanFormFile = (formData: FormData): File => {
    const file = formData.get('file')
    if (file == null) {
        throw new Error("No file found in formData with key 'file'")
    }
    if (!(file instanceof File)) {
        throw new ValidationError('Unexpected file type for product_picture')
    }

    if (file.size === 0) {
        throw new Error("No file data found with key 'file'")
    }
    if (file.size > FILE_LIMIT) {
        throw new ValidationError(`File is bigger than limit: "${FILE_LIMIT}"`)
    }
    return file
}

export const handleProductImageUpload = async (
    formData: FormData,
    productName: string
): Promise<FileDTO> => {
    try {
        const formFile = cleanFormFile(formData)
        const fileName = await saveFile(formFile, productName)
        const file = await ImageModel.create(
            {
                path: fileName
                // size: formFile.size
            },
            { returning: true }
        )
        return {
            id: file.id,
            path: file.path,
            productId: null,
            productVariantId: null
            // size: file.size
        } satisfies ImageDTO
    } catch (err: any) {
        console.error('Error on handleForm:  ', err)
        // Если это ошибка валидации, выбрасываем ее как ValidationError
        if (err instanceof ValidationError) {
            // Чтобы клиент мог поймать ее как ошибку с сообщением
            throw err
        }
        // Для всех остальных ошибок, выбрасываем общую Error
        throw new Error(`Server error: ${err.message || String(err)}`)
    }
}
