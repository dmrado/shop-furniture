'use client'
import {createContext, useContext, useState, useEffect, useCallback} from 'react'
import {getCart} from '@/actions/user/getCart'
import {cartProductDelete, updateQuantityAction} from '@/actions/user/cartProductQuantity'

const UserCartContext = createContext({finalAmount: 0, total: 0, totalDiscount: 0, totalDiscountPercent: 0, count: 0, cartRows: [], updateQuantity: (id: number, quantity: number)=> Promise<void> })

export const UserCartProvider = ({children}) => {
    const [cartRows, setCartRows] = useState<any[]>([])

    useEffect(() => {
        const fetchCart = async () => {
            const rows = await getCart()
            setCartRows(rows)
            console.log('rows', rows)
        }
        fetchCart()
    }, [])

    const updateQuantity = async (cartId: number, newQuantity: number) => {
        const updatedCart = await updateQuantityAction({id: cartId, newQuantity})
        setCartRows(cartRows.map(row =>
            row.id === updatedCart.id
                ? updatedCart
                : row
        ))
    }
    // todo: define addItemToCart and deleteItemFromCart functions.

    const total = cartRows.reduce((sum, item) =>
        sum + item.product.new_price * item.quantity, 0)

    const totalDiscount = cartRows.reduce((acc, item) =>
        acc + (item.product?.old_price - item.product?.new_price) * item?.quantity, 0)

    const finalAmount = total - totalDiscount


    // Расчет общей скидки в процентах
    const totalOldPrice = cartRows.reduce((sum, item) =>
        sum + (item.product?.old_price || 0) * item.quantity, 0);
    const totalNewPrice = cartRows.reduce((sum, item) =>
        sum + (item.product?.new_price || 0) * item.quantity, 0);
    const totalDiscountPercent = ((totalOldPrice - totalNewPrice) / totalOldPrice * 100);

        const value = {
            total,
            totalDiscount,
            finalAmount,
            totalDiscountPercent,
            count: cartRows.length,
            cartRows,
            updateQuantity
        }
    console.warn( '>>> >>>>>>>>>>>> finalAmount', finalAmount, 'total', total,  'totalDiscount', totalDiscount)

        return <UserCartContext.Provider value={value}>{children}</UserCartContext.Provider>
    }
    export const useUserCartContext = () => useContext(UserCartContext)

