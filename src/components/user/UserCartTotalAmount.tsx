import React from 'react'
import {useUserCartContext} from "@/components/user/UserCartContext";

const UserCartTotalAmount = () => {
    const {finalUserCartAmount} = useUserCartContext()
    return (
        <div className="text-2xl text-green-600 font-bold">
            Итого: {finalUserCartAmount} ₽
        </div>
    )
}

export default UserCartTotalAmount