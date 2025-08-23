import UserProfile from '@/components/user/UserProfile'
import { ProfileModel, AddressModel } from '@/db/models'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { isSessionExpired } from '@/actions/isSessionExpired.ts'
import { previousOrders } from '@/components/mockData'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
    createUserProfileAction,
    updateUserAgreementAction
} from '@/actions/userActions'
// import { revalidatePath } from 'next/cache'

//todo хистори - это отфильтровано за период в Orders
//todo создать модель для избранного "с сердечком"
//todo создать получение id-шников недавно просмотренного из Local Storage с запросом к модели для получения данных и соотв сохранения 20 недавно просмотренных товаров

//ВНИМАНИЕ! в AuthAdapter при создании нового юзера из гугл/яндекс аккаунта стоит isAgreed: false, поэтому при входе на эту в компоненте UserProfile сразу на входе стоит ознакомление и подтверждение ознакомления с политикой обработки персональных данных

const ProfilePage = async () => {
    // При переходе после авторизации или регистрации через провайдра
    const session = await getServerSession(authOptions)

    if (!session || isSessionExpired(session)) {
        return redirect('/api/auth/signin')
    }
    console.log('session', session.user)

    let profile = await ProfileModel.findOne({
        where: {
            userId: session.user.id
        }
    })

    if (!profile) {
        await createUserProfileAction(session.user.id)
        profile = await ProfileModel.findOne({
            where: {
                userId: session.user.id
            }
        })
        // revalidatePath('/profile')
        // redirect('/profile')
    }

    console.log('>>>>>>> >>>>>>>>>  profileUser после преобразования', profile)

    //todo запрос адресов
    const result = await AddressModel.findAll({
        where: {
            userId: session.user.id
        }
    }).then((adList) => adList.map((ad) => ad.toJSON()))

    const addresses = result.map((item) => {
        return {
            _id: item.id,
            city: item.city,
            phone: item.phone,
            street: item.street,
            home: item.home,
            corps: item.corps,
            appart: item.appart,
            userId: item.userId,
            isMain: item.isMain
        }
    })

    // console.log('addresses from profile page', addresses)

    const user = {
        id: session.user.id,
        email: session.user.email,
        photo: session.user.picture,
        name: profile?.name ?? session.user.name.split(' ')[0],
        surName: profile?.surName ?? session.user.name.split(' ')[1],
        fatherName: profile?.fatherName ?? '',
        isAgreed: profile?.isAgreed ?? false
    }

    //todo какого юзера использовать из сессии или из Profile. Если первого то могут быть ошибки дальше, если второго -он может не прийти. я бы второго, ног тогда как изменить Розового зайку на нормалоьное имя для счет-фактуры

    return (
        <>
            <UserProfile
                user={user}
                ad={[...result]}
                previousOrders={previousOrders}
            />
        </>
    )
}

export default ProfilePage
