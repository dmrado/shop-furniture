import UserProfile from '@/components/user/UserProfile'
import {UserModel} from '@/db/models/user.model'
import { User, Address } from "@/db/types/interfaces"
import { AddressModel } from "@/db/models/address.model"

const ProfilePage = async () => {

    //todo хистори - это отфильтровано за период в Orders
    //todo создать модель для избранного "с сердечком"
    //todo создать получение id-шников недавно пролсмотренного из Local Storage с запросом к модели для получения данных и соотв сохранения 20 недавно просмотренных товаров

    // const user = {
    //     name: 'Иван Иванов',
    //     email: 'ivan@example.com',
    //     // photo: 'https://via.placeholder.com/150',
    //     userAddress: [
    //         {
    //             addressId: 1,
    //             street: 'Варварка дом. 38 корп. 2, кв. 24',
    //             city: 'Москва',
    //             postalCode: '111333',
    //             floor: '10',
    //             entrance: '7',
    //             intercom: '024',
    //             cargo_elevator: '1',
    //             phoneNumber: '8-901-0987654'
    //         },
    //         {
    //             addressId: 2,
    //             street: 'Петровка дом. 6 стр. 5, кв. 124',
    //             city: 'Москва',
    //             postalCode: '222444',
    //             floor: '3',
    //             entrance: '2',
    //             intercom: '124',
    //             cargo_elevator: '1',
    //             phoneNumber: '8-901-0987654'
    //         },
    //         {
    //             addressId: 3,
    //             street: 'Ордынка 11 строение 1, квартира 43',
    //             city: 'Москва',
    //             postalCode: '333555',
    //             floor: '5',
    //             entrance: '1',
    //             intercom: '043',
    //             cargo_elevator: '0',
    //             phoneNumber: '8-916-0982624'
    //         },
    //     ]
    // }
    //
    // // const deliveryDate = toLocaleDateString('ru-RU', Date.now())
    // // const deliveryAddress = userAddress[n]
    //
    const previousOrders = [
        {
            id: 1,
            sku: 1111,
            title: 'Элитный диван',
            description: 'Удобный и стильный диван для вашего дома.',
            price: 1200,
            image: '/modulnyj-divan.jpg',
        },
        {
            id: 2,
            sku: 1112,
            title: 'Кофейный столик',
            description: 'Красивая и функциональная мебель.',
            price: 400,
            image: '/kofeinii-stolik-elite.webp',
        },
        {
            id: 1,
            sku: 1111,
            title: 'Элитный диван',
            description: 'Удобный и стильный диван для вашего дома.',
            price: 1200,
            image: '/modulnyj-divan.jpg',
        },
        {
            id: 2,
            sku: 1112,
            title: 'Кофейный столик',
            description: 'Красивая и функциональная мебель.',
            price: 400,
            image: '/kofeinii-stolik-elite.webp',
        },
        {
            id: 1,
            sku: 1111,
            title: 'Элитный диван',
            description: 'Удобный и стильный диван для вашего дома.',
            price: 1200,
            image: '/modulnyj-divan.jpg',
        },

        {
            id: 3,
            sku: 1113,
            title: 'Славянский шкаф',
            description: 'Красивая и функциональная мебель.',
            price: 2700,
            image: '/slavianskii-shkaf.jpg',
        },
        {
            id: 4,
            sku: 1114,
            title: 'Тумбочка для славянского шкафа',
            description: 'Красивая и функциональная мебель.',
            price: 300,
            image: '/tumbochka-for-slavianskii-shkaf.jpg',
        },
    ]

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

    if(!userData){
        return 'Не вышло'
    }

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
    return (<>
            <UserProfile user={userProfile} previousOrders={previousOrders}/>
        </>
    )
}

export default ProfilePage
