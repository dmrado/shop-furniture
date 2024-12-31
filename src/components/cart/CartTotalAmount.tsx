import React from 'react'
import { useCartContext } from '@/components/cart/CartContext'

const CartTotalAmount = () => {
    const { finalAmount } = useCartContext()
    return (
        <div className="text-2xl text-green-600 font-bold">
            Итого: {finalAmount.toFixed(2)} ₽
        </div>
    )
}

export default CartTotalAmount
