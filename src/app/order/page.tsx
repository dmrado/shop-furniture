import React from 'react'
import UserOrderForm from '@/components/user/userOrderForm'

interface UserAddress {
    id: string;
    fullNameReceiver: string;
    postalCode: string;
    city: string;
    street: string;
    phoneNumber: string;
}

interface Props {
    user: {
        userAddress: UserAddress[]
    };
}

const OrderPage: React.FC<Props> = ({ user }) => {

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //
    //     // todo переделать  запрос на сервер в серверный экшен
    //     const response = await fetch('/api/order', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             selectedAddress,
    //             fullName,
    //             phoneNumber,
    //         }),
    //     })
    //
    //     if (response.ok) {
    //         // Обработка успешного ответа
    //         router.push('/success'); // Переход на страницу успеха
    //     } else {
    //         // Обработка ошибки
    //         console.error('Ошибка при оформлении заказа')
    //     }
    // }

    return <>
            <UserOrderForm />
        </>
}

export default OrderPage
