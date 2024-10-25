import UserDashboard from '@/components/UserDashboard'

const Dashboard = () => {

    const user = {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        // photo: 'https://via.placeholder.com/150',
        delivery_address: '',
        delivery_date: Date.now(),
    };

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
        <UserDashboard user={user} cartItems={cartItems} />
    </>
)
}

export default Dashboard;
