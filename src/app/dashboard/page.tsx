import UserDashboard from '@/components/UserDashboard'

const Dashboard = () => {

    const user = {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        // photo: 'https://via.placeholder.com/150',
        userAddress: [
            {
                fullNameReceiver: 'Иван Иванович Иванов',
                street: 'Варварка дом. 38 корп. 2, кв. 24',
                city: 'Москва',
                postalCode: '111333',
                phoneNumber: '8-901-0987654'
            },
            {
                fullNameReceiver: 'Иванова Лидия Ивановна',
                street: 'Петровка дом. 6 стр. 5, кв. 124',
                city: 'Москва',
                postalCode: '222444',
                phoneNumber: '8-901-0987654'
            },
            {
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

    return (  <>
        <UserDashboard user={user} cartItems={cartItems}/>
    </>
)
}

export default Dashboard
