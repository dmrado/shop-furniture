import React from 'react'
import UserOrderForm from '@/components/user/UserOrderForm'
import { UserModel } from '@/db/models'
import { AddressModel } from '@/db/models'
import { InferAttributes } from 'sequelize'

export interface UserProfile extends InferAttributes<UserModel> {
    addresses: InferAttributes<AddressModel>[]
}

const OrderPage = async () => {
    //todo получить id пользователя
    const userData = await UserModel.findOne({
        where: {
            id: 1
        },
        include: [{
            model: AddressModel,
            attributes: [ 'id', 'phone', 'city', 'street', 'home', 'corps', 'appart', 'isMain' ],
            as: 'addresses' // используем тот же алиас, что указали при определении связи
        },
            //todo сделать модель телефонов юзеру
        ]
    })

    if(!userData || !userData.addresses) {
        throw new Error('Invalid DB response')
    }

    const userProfile: UserProfile = {
        id: userData.id,
        name: userData.name,
        surName: userData.surName,
        fatherName: userData.fatherName,
        email: userData.email,
        isActive: userData.isActive,
        canContact: userData.canContact,
        addresses: userData.addresses.map(address => ({
            id: address.id,
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

    return <>
        <UserOrderForm user={userProfile}/>
    </>
}

export default OrderPage
