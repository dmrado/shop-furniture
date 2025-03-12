import CartTotal from '@/components/cart/CartTotal'
import Cart from '@/components/cart/Cart'
import { getServerSession } from 'next-auth'
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const CartPage = async () => {
    const session = await getServerSession(authOptions)
    console.log('Cart Session', session)
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    // const userId = session.user.id //в корзине не передаем на бекенд

    // if (!session || !isAdmin(session) || isSessionExpired(session)) {
    //     return redirect('/api/auth/signin')
    // }

    return (
        <div>
            <CartTotal />
            <Cart />
        </div>
    )
}

export default CartPage
