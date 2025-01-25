'use client'
import React from 'react'
import { useCartContext } from '@/components/cart/CartContext'

const CartTotalAmount = () => {
    const { finalAmount } = useCartContext()
    return <>
          {Number(finalAmount.toFixed(2))}
        </>
}

export default CartTotalAmount
