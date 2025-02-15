import UserProfile from '@/components/user/UserProfile'
import {UserModel, AddressModel} from '@/db/models'
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import { isSessionExpired } from '@/actions/isSessionExpired.ts'
import {AuthAdapter} from "@/app/api/auth/[...nextauth]/AuthAdapter";
import {previousOrders} from "@/components/mockData";

//todo хистори - это отфильтровано за период в Orders
//todo создать модель для избранного "с сердечком"
//todo создать получение id-шников недавно просмотренного из Local Storage с запросом к модели для получения данных и соотв сохранения 20 недавно просмотренных товаров

//ВНИМАНИЕ! в AuthAdapter при создании нового юзера из гугл/яндекс аккаунта стоит isAgreed: false, поэтому при входе на эту в компоненте UserProfile сразу на входе стоит ознакомление и подтверждение ознакомления с политикой обработки персональных данных

const ProfilePage = async () => {
    const session = await getServerSession()
    if (!session || isSessionExpired(session)) {
        return redirect('/api/auth/signin')
    }

    const email: string = session.user.email

    // Пытаемся найти пользователя через AuthAdapter по email из сессии
    const existingUser = await AuthAdapter().getUserByEmail(email)

    // Если пользователь не найден в базе, создаем нового через AuthAdapter
    if (!existingUser) {
        const newUser = await AuthAdapter().createUser({
            email: session.user.email,
            name: session.user.name || '',
        })

             // todo ?надо ли еще раз полуить юзера из AuthAdapter().getUser({id})

             return <>
                <UserProfile user={newUser} previousOrders={previousOrders}/>
            </>
    }

    return <>
            <UserProfile user={existingUser} previousOrders={previousOrders}/>
        </>
}

export default ProfilePage
