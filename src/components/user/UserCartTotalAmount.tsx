import React from 'react'
import {useUserCartContext} from '@/components/user/UserCartContext.tsx'

const UserCartTotalAmount = () => {
    const {finalAmount} = useUserCartContext()
    return (
        <div className="text-2xl text-green-600 font-bold">
            Итого: {finalAmount} ₽
        </div>
    )
}

export default UserCartTotalAmount