import CartTotal from '@/components/cart/CartTotal'
import Cart from '@/components/cart/Cart'
import { getServerSession } from 'next-auth'
import CartTotalAmount from "@/components/cart/CartTotalAmount";

const CartPage = async () => {
    const session = await getServerSession()
    console.log('session', session)

    // if (!session || !isAdmin(session) || isSessionExpired(session)) {
    //     return redirect('/api/auth/signin')
    // }

    return (
        <div>
            <CartTotalAmount/>
            <CartTotal />
            <Cart />
        </div>
    )
}

export default CartPage
