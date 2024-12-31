import React from 'react'
import { useUserCartContext } from '@/components/cart/CartContext'

const CartTotalAmount = () => {
    const { finalAmount } = useUserCartContext()
    return (
        <div className="text-2xl text-green-600 font-bold">
            Итого: {finalAmount.toFixed(2)} ₽
        </div>
    )
}

export default CartTotalAmount
