'use server'
import {redirect} from 'next/navigation'
import {ADDRESS_MIN_LENGTH, CITY_MIN_LENGTH} from '@/app/constants.ts'
import {AddressModel, UserModel} from "@/db/models"
import {sanitizeAndTruncate} from "@/actions/sanitizer";
import {InferAttributes, InferCreationAttributes} from "sequelize";

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
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
    const userId = Number(deliveryAddress.get('userId')) // обязательное поле
    const phone = deliveryAddress.get('phone')
    const email = deliveryAddress.get('email')
    const city = deliveryAddress.get('city')
    const street = deliveryAddress.get('street')
    const home = deliveryAddress.get('home')
    const corps = deliveryAddress.get('corps')
    const appart = deliveryAddress.get('appart')
    const isMain = Boolean(deliveryAddress.get('isMain'))
    if (
        typeof phone !== 'string' ||
        typeof email !== 'string' ||
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
        !home ||
        !appart
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
        userId,
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
    try {
        const {
            id,
            userId,
            phone,
            city,
            street,
            home,
            corps,
            appart,
            isMain
        } = cleanFormData(deliveryAddress)

        const previewPhoneNumber = sanitizeAndTruncate(phone, 50);
        const previewCity = sanitizeAndTruncate(city);
        const previewStreet = sanitizeAndTruncate(street);

        const existingAddress: AddressModel | null = await AddressModel.findOne({
            where: {
                id,
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
            return {error: 'Такой адрес уже существует'}
        }

        const newAddress: InferCreationAttributes<AddressModel> = await AddressModel.create({
                id,
                userId,
                phone: previewPhoneNumber,
                city: previewCity,
                street: previewStreet,
                home,
                corps,
                appart,
                isMain
        })
        return {success: true, address: newAddress}

    } catch (err) {
        console.error('Error on handleForm:  ', err)
        if (err instanceof ValidationError) {
            return redirect('/api/error/?code=400&message=VALIDATION_ERROR')
        }
        return redirect('/api/error/?code=500&message=SERVER_ERROR')
    }
}