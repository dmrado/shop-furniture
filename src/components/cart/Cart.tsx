'use client'
// этот компонент нужен для использования его как клиентский для деструктурирования из контекста useUserCartContext
import { useCartContext } from '@/components/cart/CartContext'
import CartRow from '@/components/cart/CartRow'
import Loading from '@/app/cart/loading'

const Cart = () => {
    const { cartRows, isLoading } = useCartContext()
    if (isLoading) {
        return <Loading />
    }

    return (
        <ul>
            {cartRows.map(cart =>
                <li key={cart.id}>
                    <CartRow cartRow={cart}/>
                </li>
            )}
        </ul>
    )
}

export default Cart
