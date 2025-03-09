import React from 'react'
import UserOrderForm from '@/components/user/UserOrderForm'
import { ProfileModel } from '@/db/models'
import { AddressModel } from '@/db/models'
import { InferAttributes } from 'sequelize'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {AuthUser} from "@/db/models/users.model";

// // const deliveryDate = toLocaleDateString('ru-RU', Date.now())
// // const deliveryAddress = userAddress[n]

export interface UserProfile extends InferAttributes<ProfileModel> {
    addresses: InferAttributes<AddressModel>[]
}

const OrderPage = async () => {
    const session = await getServerSession(authOptions)
    console.log('Order Session', session)
    const userId = session.user.id

    const addresses = await AddressModel.findAll({
        where: {
            id: userId
        },
    })

    const profile = await ProfileModel.findOne({
        where: {
            id: userId
        },
    })

    const user = session.user

    if(!addresses) {
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
