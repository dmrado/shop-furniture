'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { OrderModel } from '@/db/models'
const validPaymentMethods = [ 'cash', 'card', 'online' ] as const
type PaymentMethod = typeof validPaymentMethods[number]

interface CleanedFormData {
    addressId: number;
    comment: string;
    paymentMethod: PaymentMethod;
    deliveryDate: Date;
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

const cleanFormData = (formData: FormData) : CleanedFormData => {
    const addressId = formData.get('addressId')
    const comment = formData.get('comment') ?? ''

    const paymentMethod = formData.get('paymentMethod')

    let deliveryDate = formData.get('deliveryDate')
    let deliveryTime = formData.get('deliveryTime')

    if (
        typeof addressId !== 'string' ||
        typeof comment !== 'string' ||
        typeof paymentMethod !== 'string' ||
        typeof deliveryDate !== 'string' ||
        typeof deliveryTime !== 'string'
    ) {
        throw new ValidationError('Filedata in text fields')
    }

    if (!validPaymentMethods.includes(paymentMethod as PaymentMethod)) {
        throw new ValidationError('Invalid payment method')
    }

    if (!addressId) {
        throw new ValidationError('Все обязательные поля должны быть заполнены')
    }

    if (deliveryDate.length === 0) {
        deliveryDate = new Date().toISOString().split('T')[0].toString()
    }

    if (deliveryTime.length === 0) {
        deliveryTime = '19:00'
    }

    const deliveryDateObj = new Date(`${deliveryDate}T${deliveryTime}:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (isNaN(deliveryDateObj.getTime())) {
        throw new ValidationError('Неверный формат даты')
    }

    if (deliveryDateObj < today) {
        throw new ValidationError('Дата доставки не может быть в прошлом')
    }

    if (isNaN(Number(addressId)) || Number(addressId) <= 0) {
        throw new ValidationError('AddressId must be a positive integer')
    }

    return {
        comment: comment,
        addressId: Number(addressId),
        paymentMethod: paymentMethod as PaymentMethod,
        deliveryDate: deliveryDateObj
    }
}

export const handleOrderToDB = async (formData: FormData) => {
    try {
        const userId = 1 // todo: брать пользователя из кукис
        const { addressId, comment, deliveryDate } = cleanFormData(formData)

        await OrderModel.create({ userId, addressId, comment, orderDate: new Date(), cartPrice: 999, deliveryDate })
    } catch (err) {
        console.error('Error on handleForm:  ', err)
        if (err instanceof ValidationError) {
            return redirect('/api/error/?code=400&message=VALIDATION_ERROR')
        }
        return redirect('/api/error/?code=500&message=SERVER_ERROR')
    }
    revalidatePath('/profile')
    redirect('/order')
}
