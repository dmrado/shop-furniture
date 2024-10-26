'use server'

import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { Post } from '@/db/post.model.ts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {FILE_LIMIT, ADDRESS_MIN_LENGTH, CITY_MIN_LENGTH} from '@/app/constants.ts'
import fs from 'fs'

class ValidationError extends Error {}

//todo saveFile можно удалить если нек будем принимать файлы от юзера
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

type UserDeliveryAddress = {
    id: number,
    fullNameReceiver: string,
    street: string,
    city: string,
    postalCode: string,
    phoneNumber: string
}

const cleanFormData = (deliveryAddress: FormData): UserDeliveryAddress => {
    const id = deliveryAddress.get('id')
    const fullNameReceiver = deliveryAddress.get('fullNameReceiver')
    const street = deliveryAddress.get('street')
    const city = deliveryAddress.get('city')
    const postalCode = deliveryAddress.get('postalCode')
    const phoneNumber = deliveryAddress.get('phoneNumber')
    if (typeof id !== 'string' || typeof fullNameReceiver !== 'string' || typeof street !== 'string' || typeof city !== 'string' || typeof postalCode !== 'string' || typeof phoneNumber !== 'string') {
        throw new ValidationError('I see you! Filedata in text fields')
    }
    if (!fullNameReceiver || !street || !city || !postalCode || !phoneNumber) {
        throw new ValidationError('Все поля обязательны')
    }
    if (fullNameReceiver.length < ADDRESS_MIN_LENGTH || street.length < ADDRESS_MIN_LENGTH || city.length < CITY_MIN_LENGTH || postalCode.length < ADDRESS_MIN_LENGTH || phoneNumber.length < ADDRESS_MIN_LENGTH) {
        throw new ValidationError('Данные не корректны')
    }
    return <UserDeliveryAddress>{
        fullNameReceiver,
        street,
        city,
        postalCode,
        phoneNumber,
        id: id ? Number(id) : undefined
    }
}
//todo cleanFormFile можно удалить если нек будем принимать файлы от юзера
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

export const handleUserAddressForm = async (deliveryAddress: FormData) => {
    try {
        const { id, fullNameReceiver, street, city, postalCode, phoneNumber } = cleanFormData(deliveryAddress)
        const previewFullNameReceiver = fullNameReceiver ? fullNameReceiver.replace(/<[^>]+>/g, '').slice(0, 100) : ''//убираем HTML-разметку
        const previewStreet = street ? street.replace(/<[^>]+>/g, '').slice(0, 100) : ''
        const previewCity = city ? city.replace(/<[^>]+>/g, '').slice(0, 100) : ''
        const previewPostalCode = postalCode ? postalCode.replace(/<[^>]+>/g, '').slice(0, 100) : ''
        const previewPhoneNumber = phoneNumber ? phoneNumber.replace(/<[^>]+>/g, '').slice(0, 100) : ''
//todo создать модель UserDeliveryAddress
        const [ savedDeliveryAddress, isUpdated ] = await UserDeliveryAddress.upsert({ id: id, previewFullNameReceiver, previewStreet, previewCity, previewPostalCode, previewPhoneNumber })

        // const formFile = cleanFormFile(formData)

        // if (formFile) {
        //     const fileName = await saveFile(formFile)
        //     await Post.update({ path: `/img/${fileName}` }, { where: { id: post.id } })
        // }
    } catch (err) {
        console.error('Error on handleForm:  ', err)
        if (err instanceof ValidationError) {
            return redirect('/api/error/?code=400&message=VALIDATION_ERROR')
        }
        return redirect('/api/error/?code=500&message=SERVER_ERROR')
    }
    revalidatePath('/dashboard')
    redirect('/dashboard')
}
