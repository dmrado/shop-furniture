import UserDashboard from '@/components/user/UserDashboard'

const Dashboard = () => {
//todo страница серверная она ходит в базу получает юзера и раздает его компонентам со всеми данными из всех моделей, или только id, а уже компоненты ходят в базу и собирают данные из моделей для отрисовки, НО ОНИ КЛИЕНТСКИЕ потому что будут требовать взаимодействия (добавить в заказ из прошлых заказову) и нре смогут выполнять серверные экшены

    //todo создать модели User, UserDeliveryAddress, ?UserOrdersHistory? с запросами к ним с этой страницы
    //todo создать модель для избранного "с сердечком"
    //todo создать полусчение id-шников недавно пролсмотренного из Local Storage с запросом к модели для получения данных и соотв сохранения 20 недавно просмотренных товаров

    const user = {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        // photo: 'https://via.placeholder.com/150',
        //todo фрагментировать на две модели, так как у корпоративного юзера могут быть сотни адресов
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
            price: 2700,
            image: '/tumbochka-for-slavianskii-shkaf.jpg',
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

    return (  <>
        <UserDashboard user={user} cartItems={cartItems} previousOrders={previousOrders}/>
    </>
)
}

export default Dashboard
