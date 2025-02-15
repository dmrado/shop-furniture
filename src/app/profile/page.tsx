import UserProfile from '@/components/user/UserProfile'
import {UserModel} from '@/db/models'
import { AddressModel } from '@/db/models'
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import { isSessionExpired } from '@/actions/isSessionExpired.ts'
import {AuthAdapter} from "@/app/api/AuthAdapter";
import {previousOrders} from "@/components/mockData";

//todo хистори - это отфильтровано за период в Orders
//todo создать модель для избранного "с сердечком"
//todo создать получение id-шников недавно просмотренного из Local Storage с запросом к модели для получения данных и соотв сохранения 20 недавно просмотренных товаров

//ВНИМАНИЕ! в AuthAdapter при создании нового юзера из гугл/яндекс аккаунта стоит   isAgreed: false, поэтому при входе на эту в компоненте UserProfile сразу на входе стоит ознакомление и подтверждение ознакомления с политикой обработки персональных данных

const ProfilePage = async () => {
    const session = await getServerSession()
    if (!session || isSessionExpired(session)) {
        return redirect('/api/auth/signin')
    }

    // Пытаемся найти пользователя в базе по email из сессии
    const existingUser = await UserModel.findOne({
        where: { email: session.user.email },
        include: [{
            model: AddressModel,
            attributes: ['id', 'phone', 'city', 'street', 'home', 'corps', 'appart', 'isMain'],
            as: 'addresses'
        }]
    });

    // Если пользователь не найден в базе, создаем нового
    if (!existingUser) {
        // Создаем нового пользователя через AuthAdapter
        const newUser = await AuthAdapter().createUser({
            email: session.user.email,
            name: session.user.name || '',
            emailVerified: null
        });

        // Получаем полные данные только что созданного пользователя
        const createdUser = await UserModel.findOne({
            where: { email: newUser.email },
            include: [{
                model: AddressModel,
                attributes: ['id', 'phone', 'city', 'street', 'home', 'corps', 'appart', 'isMain'],
                as: 'addresses'
            }]
        });

        // Преобразуем данные для передачи в компонент
        const userProfile = createdUser?.toJSON()

        return (
            <>
                <UserProfile user={userProfile} previousOrders={previousOrders}/>
            </>
        );
    }

    // Если пользователь был найден, преобразуем его данные и отправляем в компонент
    const userProfile = existingUser.toJSON()

    return (
        <>
            <UserProfile user={userProfile} previousOrders={previousOrders}/>
        </>
    );
}

export default ProfilePage
