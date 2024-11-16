import React from 'react'
import UserOrderForm from '@/components/user/UserOrderForm'
import {UserModel} from "@/db/models/user.model";
import {AddressModel} from "@/db/models/address.model";

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
    }
}

//todo получить id пользователя
const userData = await UserModel.findOne({
    where: {
        id: 1
    },
    include: [{
        model: AddressModel,
        attributes: ['id', 'phone', 'city', 'street', 'home', 'corps', 'appart', 'isMain' ],
        as: 'addresses'  // используем тот же алиас, что указали при определении связи
    },
        // todo организовать получение данных из новой модели
        //     {
        //     // model: PayMethodsModel,
        //        as: 'paymethods'
        // }
    ]
})





const OrderPage: React.FC<Props> = ({ user }) => {

   // todo переделать  запрос на сервер в серверный экшен и передать его в компонент формы ниже UserOrderForm

    return <>
            <UserOrderForm/>
        </>
}

export default OrderPage
