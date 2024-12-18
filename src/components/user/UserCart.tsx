'use client'
import {useUserCartContext} from "@/components/user/UserCartContext";
import UserCartRow from "@/components/user/UserCartRow";

const UserCart = () => {
    const {cartRows} = useUserCartContext()

    return (
        <ul>
            {cartRows.map(cart =>
                <li key={cart.id}>
                    <UserCartRow cartItem={cart}/>
                </li>
            )}
        </ul>
    );
};

export default UserCart;
