'use server'
import { redirect } from 'next/navigation'
import { ADDRESS_MIN_LENGTH, CITY_MIN_LENGTH } from '@/app/constants.ts'
import { AddressModel, ProfileModel } from '@/db/models'
import { sanitizeAndTruncate } from '@/actions/sanitizer'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

type UserDeliveryAddress = {
    id?: number,
    userId: number,
    phone: string
    city: string,
    street: string,
    home: string,
    corps: string,
    appart: string,
    isMain: boolean,
}

const cleanFormData = (deliveryAddress: FormData): UserDeliveryAddress => {
    const id = deliveryAddress.get('id') ? Number(deliveryAddress.get('id')) : undefined
    const phone = deliveryAddress.get('phone')
    // const email = deliveryAddress.get('email')
    const city = deliveryAddress.get('city')
    const street = deliveryAddress.get('street')
    const home = deliveryAddress.get('home')
    const corps = deliveryAddress.get('corps')
    const appart = deliveryAddress.get('appart')
    const isMain = Boolean(deliveryAddress.get('isMain'))
    if (
        typeof phone !== 'string' ||
        // typeof email !== 'string' ||
        typeof city !== 'string' ||
        typeof street !== 'string' ||
        typeof home !== 'string' ||
        typeof corps !== 'string' ||
        typeof appart !== 'string'
    ) {
        throw new ValidationError('I see you! Filedata in text fields')
    }
    if (!phone ||
        !city ||
        !street ||
        !home //||
        // !appart
    ) {
        throw new ValidationError('Все поля обязательны')
    }
    if (
        phone.length < ADDRESS_MIN_LENGTH ||
        city.length < CITY_MIN_LENGTH ||
        street.length < ADDRESS_MIN_LENGTH
    ) {
        throw new ValidationError('Данные не корректны')
    }
    return <UserDeliveryAddress>{
        id,
        phone,
        city,
        street,
        home,
        corps,
        appart,
        isMain
    }
}

export const userAddressFormAction = async (deliveryAddress: FormData) => {
    console.warn('userAddressFormAction', deliveryAddress)
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    try {
        const {
            id,
            phone,
            city,
            street,
            home,
            corps,
            appart,
            isMain
        } = cleanFormData(deliveryAddress)
        console.warn('userAddressFormAction', userId, phone, city, street, home, corps)
        const previewPhoneNumber = sanitizeAndTruncate(phone, 50)
        const previewCity = sanitizeAndTruncate(city)
        const previewStreet = sanitizeAndTruncate(street)

        const existingAddress: AddressModel | null = await AddressModel.findOne({
            where: {
                // id,
                userId,
                phone: previewPhoneNumber,
                city: previewCity,
                street: previewStreet,
                home,
                corps,
                appart,
                isMain
            }
        })
        if (existingAddress) {
            return { error: 'Такой адрес уже существует' }
        }

        let address: AddressModel | null = null
        if (id) {
            await AddressModel.update({
                phone,
                city,
                street,
                home,
                corps,
                appart,
                isMain
            }, { where: { id } })
            address = await AddressModel.findByPk(id)
        } else {
            address = await AddressModel.create({
                // id,
                userId,
                phone: previewPhoneNumber,
                city: previewCity,
                street: previewStreet,
                home,
                corps,
                appart,
                isMain
            })
        }

        return { success: true, address: address?.toJSON() }

    } catch (err) {
        console.error('Error on handleForm:  ', err)
        if (err instanceof ValidationError) {
            return redirect('/api/error/?code=400&message=VALIDATION_ERROR')
        }
        // return redirect('/api/error/?code=500&message=SERVER_ERROR')
    }
}
