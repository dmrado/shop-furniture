import React from 'react'
import UserOrderForm from '@/components/user/UserOrderForm'
import {UserModel} from "@/db/models/user.model";
import {AddressModel} from "@/db/models/address.model";
import UserAddressForm from "@/components/user/UserAddressForm";
import {User} from "@/db/types/interfaces";

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
    // Дополнительные опции
    // raw: true, // Получить простой объект вместо экземпляра модели
    // nest: true, // Вложенные объекты в виде JSON
    // Выбор конкретных полей
    // attributes: ['id', 'email', 'name', 'surName'],
    // Если нужны связанные данные
    include: [{
        model: AddressModel,
        attributes: ['id', 'phone', 'city', 'street', 'home', 'corps', 'appart', 'isMain' ],
        as: 'addresses'  // используем тот же алиас, что указали при определении связи
    }]
})

// if(!userData){
//     return 'Не вышло order'
// }

const userProfile: User = {
    id: userData.id,
    name: userData.name,
    surName: userData.surName,
    fatherName: userData.fatherName,
    email: userData.email,
    isActive: userData.isActive,
    canContact: userData.canContact,
    addresses: userData.addresses.map(address=>({
        id: userData.id,
        city: address.city,
        phone: address.phone,
        street: address.street,
        home: address.home,
        corps: address.corps,
        appart: address.appart,
        userId: address.userId,
        isMain: address.isMain
    }))
}



const OrderPage: React.FC<Props> = ({ user }) => {

   // todo переделать  запрос на сервер в серверный экшен и передать его в компонент формы ниже UserOrderForm

    return <>
            <UserOrderForm user={userProfile}/>
        </>
}

export default OrderPage
