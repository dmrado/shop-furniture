import UnauthorizedUser from '@/components/user/UnauthorizedUser'
import EmptyCart from '@/components/cart/EmptyCart'

const Page = () => {
    return (
        <div>
            <UnauthorizedUser/>
            <EmptyCart/>
        </div>
    )

}
export default Page