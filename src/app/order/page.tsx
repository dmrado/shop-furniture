import React from 'react'
import UserOrderForm from '@/components/user/UserOrderForm'

interface UserAddress {
    id: string;
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

   // todo переделать  запрос на сервер в серверный экшен и передать его в компонент формы ниже UserOrderForm

    return <>
            <UserOrderForm/>
        </>
}

export default OrderPage
