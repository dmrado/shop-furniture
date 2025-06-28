'use client'
import React from 'react'
import { useCartContext } from '@/components/cart/CartContext'

const CartTotalAmount = () => {
    const { selectedTotalAmount } = useCartContext()
    return <>
       {Number(selectedTotalAmount.toFixed(2))}
        </>
}

export default CartTotalAmount
