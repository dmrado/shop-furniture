import UserProfile from '@/components/user/UserProfile'
import { ProfileModel, AddressModel } from '@/db/models'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { isSessionExpired } from '@/actions/isSessionExpired.ts'
import { previousOrders } from '@/components/mockData'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

//todo хистори - это отфильтровано за период в Orders
//todo создать модель для избранного "с сердечком"
//todo создать получение id-шников недавно просмотренного из Local Storage с запросом к модели для получения данных и соотв сохранения 20 недавно просмотренных товаров

//ВНИМАНИЕ! в AuthAdapter при создании нового юзера из гугл/яндекс аккаунта стоит isAgreed: false, поэтому при входе на эту в компоненте UserProfile сразу на входе стоит ознакомление и подтверждение ознакомления с политикой обработки персональных данных

const ProfilePage = async () => {

    const session = await getServerSession(authOptions)

    if (!session || isSessionExpired(session)) {
        return redirect('/api/auth/signin')
    }
    console.log('session', session.user)
    console.log('>>>>>>> isAgreed', session.user.isAgreed)

    const profile = await ProfileModel.findOne({
        where: {
            userId: session.user.id
        }
    })

    //todo запрос адресов
    const result = await AddressModel.findAll({
        where: {
            userId: session.user.id
        }
    })

    const addresses = result.map(item => ({
        id: item.id,
        city: item.city,
        phone: item.phone,
        street: item.street,
        home: item.home,
        corps: item.corps,
        appart: item.appart,
        userId: item.userId,
        isMain: item.isMain
    }))

    console.log('addresses from profile page', addresses)

    const user = {
        email: session.user.email,
        photo: session.user.photo,
        name: profile?.name ?? session.user.name.split(' ')[0],
        // surName: profile.surName ?? session.user.name.split(' ')[1],
        surName: '',
        fatherName: profile?.fatherName ?? '',
        isAgreed: profile?.isAgreed ?? false
    }

    //todo Если пользователь не найден в базе, создаем нового?

    return <>
        <UserProfile user={user} addresses={addresses} previousOrders={previousOrders}/>
    </>
}

export default ProfilePage
