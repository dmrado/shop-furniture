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

    const profile = await ProfileModel.findOne({
        where: {
            userId: session.user.id
        }
    })

    //todo запрос адресов
    const addresses = await AddressModel.findOne({
        where: {
            userId: session.user?.id
        }
    })
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

    // Пытаемся найти пользователя через AuthAdapter по email из сессии
    // const existingUser = await AuthAdapter().getUserByEmail(email)

    // Если пользователь не найден в базе, создаем нового через AuthAdapter
    // if (!existingUser) {
    //     const newUser = await AuthAdapter().createUser({
    //         email: session.user.email,
    //         name: session.user.name || '',
    //     })

    // todo ?надо ли еще раз полуить юзера из AuthAdapter().getUser({id})

    // todo отрендерить компонент или модал с открытой формой регистрации с полями photo name fatherName surName email
    //     return <>
    //         <UserProfile user={newUser} previousOrders={previousOrders}/>
    //     </>
    // }

    return <>
        <UserProfile user={user} addresses={addresses} previousOrders={previousOrders}/>
    </>
}

export default ProfilePage
