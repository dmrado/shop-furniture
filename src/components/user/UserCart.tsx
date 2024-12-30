'use client'
import { useUserCartContext } from '@/components/user/UserCartContext'
import UserCartRow from '@/components/user/UserCartRow'
import Loading from '@/app/cart/loading'

const UserCart = () => {
    const { cartRows, isLoading } = useUserCartContext()
    if (isLoading) {
        return <Loading />
    }

    return (
        <ul>
            {cartRows.map(cart =>
                <li key={cart.id}>
                    <UserCartRow cartRow={cart}/>
                </li>
            )}
        </ul>
    )
}

export default UserCart
