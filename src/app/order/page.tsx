import React from 'react'
import UserOrderForm from '@/components/user/UserOrderForm'
import { OuruserModel } from '@/db/models'
import { AddressModel } from '@/db/models'
import { InferAttributes } from 'sequelize'

// // const deliveryDate = toLocaleDateString('ru-RU', Date.now())
// // const deliveryAddress = userAddress[n]

export interface UserProfile extends InferAttributes<OuruserModel> {
    addresses: InferAttributes<AddressModel>[]
}

const OrderPage = async () => {
    //todo дублировать сессию и AuthAdapter из ProfilePage
    const userData = await OuruserModel.findOne({
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
