import UserDashboard from '@/components/UserDashboard'

const Dashboard = () => {
//todo страница серверная она ходит в базу получает юзера и раздает его компонентам со всеми данными из всех моделей, или только id, а уже компоненты ходят в базу и собирают данные из моделей для отрисовки, НО ОНИ КЛИЕНТСКИЕ потому что будут требовать взаимодействия (добавить в заказ из прошлых заказову)?

    //todo создать модели User, UserDeliveryAddress, UserOrdersHistory
    //todo создать модель для избранного "с сердечком"

    const user = {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        // photo: 'https://via.placeholder.com/150',
        //todo дефрагментировать на две модели, так как у корпоративного юзера могут быть сотни адресов
        userAddress: [
            {
                addressId: 1,
                fullNameReceiver: 'Иван Иванович Иванов',
                street: 'Варварка дом. 38 корп. 2, кв. 24',
                city: 'Москва',
                postalCode: '111333',
                phoneNumber: '8-901-0987654'
            },
            {
                addressId: 2,
                fullNameReceiver: 'Иванова Лидия Ивановна',
                street: 'Петровка дом. 6 стр. 5, кв. 124',
                city: 'Москва',
                postalCode: '222444',
                phoneNumber: '8-901-0987654'
            },
            {
                addressId: 3,
                fullNameReceiver: 'Кузнецова Василиса Ивановна',
                street: 'Ордынка 11 строение 1, квартира 43',
                city: 'Москва',
                postalCode: '333555',
                phoneNumber: '8-916-0982624'
            },
        ]
    }



    // const deliveryDate = toLocaleDateString('ru-RU', Date.now())
    // const deliveryAddress = userAddress[n]

    const cartItems = [
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
    ]

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
            id: 2,
            sku: 1112,
            title: 'Кофейный столик',
            description: 'Красивая и функциональная мебель.',
            price: 400,
            image: '/kofeinii-stolik-elite.webp',
        },
    ]

    return (  <>
        <UserDashboard user={user} cartItems={cartItems} previousOrders={previousOrders}/>
    </>
)
}

export default Dashboard
