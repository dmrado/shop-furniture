'use server'
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {OrderModel} from "@/db/models/order.model";
import {Order} from '@/db/types/interfaces'


interface CleanedFormData {
    id?: string;
    name: string;
    phone: string;
    email: string;
    //todo userId: number;
    //todo addressId: number;
    selectedAddress: string;
    comment?: string;
    paymentMethod: string;
    deliveryDate: Date;
}


class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

const cleanFormData = (formData: FormData) : CleanedFormData => {

    const id = formData.get('id')?.toString()
    const name = formData.get('name')?.toString().trim()
    const phone = formData.get('phone')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    // todo const addressId = formData.get('userId')
    // todo const addressId = formData.get('addressId')
    const selectedAddress = formData.get('selectedAddress')?.toString().trim()
    const comment = formData.get('comment')?.toString().trim()
    const paymentMethod = formData.get('paymentMethod')
    const deliveryDate = formData.get('deliveryDate')?.toString()

    console.log('handleOrderToDb id', id, 'name', name, 'phone', phone, 'email', email, 'selectedAddress', selectedAddress, 'comment', comment, 'paymentMethod', paymentMethod, 'deliveryDate', deliveryDate)

    const validPaymentMethods = ['cash', 'card', 'online']
    if (!validPaymentMethods.includes(paymentMethod.toString())) {
        throw new ValidationError('Invalid payment method')
    }

    if (!name || !phone || !email || !selectedAddress || !paymentMethod || !deliveryDate) {
        throw new ValidationError('Все обязательные поля должны быть заполнены')
    }
    if (name.length < 2 || name.length > 100) {
        throw new ValidationError('Имя должно содержать от 2 до 100 символов');
    }
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.toString())) {
        throw new ValidationError('Неверный формат email')
    }

    // Валидация телефона (пример для российского формата)
    const phoneRegex = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
    if (!phoneRegex.test(phone.toString())) {
        throw new ValidationError('Неверный формат телефона')
    }

    // Валидация даты доставки
    const deliveryDateObj = new Date(deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(deliveryDateObj.getTime())) {
        throw new ValidationError('Неверный формат даты');
    }

    if (deliveryDateObj < today) {
        throw new ValidationError('Дата доставки не может быть в прошлом');
    }

    if (typeof id !== 'string' ||   typeof comment !== 'string' || typeof paymentMethod !== 'string'
        // || typeof name !== 'string' || typeof deliveryDate !== 'string' || || typeof selectedAddress !== 'string' typeof email !== 'string' ||
    ) {
        throw new ValidationError('Filedata in text fields')
    }
    if (name.toString().length > 3) {
        throw new ValidationError('Name is too long')
    }
    if (selectedAddress.toString().length < 5) {
        throw new ValidationError('Адрес слишком короткий')
    }

    return {
        id: id?.toString(),
        name: name.toString(),
        phone: phone.toString(),
        email: email.toString(),
        selectedAddress: selectedAddress.toString(),
        // todo userId:
        // todo addressId:
        comment: comment?.toString() || '',
        paymentMethod: paymentMethod.toString(),
        deliveryDate: deliveryDateObj
    }
}

export const handleOrderToDB = async (formData: FormData) => {
    try {
        const {userId: id, name, phone, email, selectedAddress, comment, paymentMethod, deliveryDate} = cleanFormData(formData)

        if(id){
            await OrderModel.update({userId, addressId, deliveryDate as orderDate
                    // name, phone, email, comment, paymentMethod, selectedAddress
                },
                { where: { id } }
            )
        } else {
            await OrderModel.create({userId, addressId, deliveryDate as orderDate})
        }
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