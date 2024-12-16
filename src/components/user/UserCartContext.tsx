'use client'
import {createContext, useContext, useState, useEffect, useCallback} from 'react'
import {getFinalAmount} from '@/actions/user/getFinalAmount'

const UserCartContext = createContext<{
    finalAmount: number,
    total: number,
    totalDiscount: number,
    totalDiscountPercent: number,

}>({finalAmount: 0, total: 0, totalDiscount: 0, totalDiscountPercent: 0, })

export const UserCartProvider = ({children}) => {
    const [finalAmount, setFinalAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [totalDiscountPercent, setTotalDiscountPercent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchCart = async () => {
            const {cartList, count} = await getFinalAmount()
            if (!Array.isArray(cartList)) return

            const newTotal = cartList.reduce((sum, item) =>
                sum + item.product?.new_price * item?.quantity, 0)

            const newTotalDiscount = cartList.reduce((acc, item) =>
                acc + (item.product?.old_price - item.product?.new_price) * item?.quantity, 0)

            const newFinalAmount = total - totalDiscount


            // Расчет общей скидки в процентах
            const totalOldPrice = cartList.reduce((sum, item) =>
                sum + (item.product?.old_price || 0) * item.quantity, 0);
            const totalNewPrice = cartList.reduce((sum, item) =>
                sum + (item.product?.new_price || 0) * item.quantity, 0);
            const totalDiscountPercent = ((totalOldPrice - totalNewPrice) / totalOldPrice * 100);


            setFinalAmount(newFinalAmount)
            setTotal(newTotal)
            setTotalDiscount(newTotalDiscount)
            setTotalDiscountPercent(totalDiscountPercent)
            setCount(count)
            console.log('newFinalAmount', newFinalAmount, 'newTotal', newTotal, 'newTotalDiscount', newTotalDiscount, 'totalDiscountPercent', totalDiscountPercent, 'count', count)
        }
        fetchCart()
    }, [])

        const value = {
            finalAmount,
            total,
            totalDiscount,
            totalDiscountPercent,
            count
        }
    console.warn( '>>> >>>>>>>>>>>> finalAmount', finalAmount, 'total', total,  'totalDiscount', totalDiscount, 'count', count)

        return <UserCartContext.Provider value={value}>{children}</UserCartContext.Provider>
    }
    export const useUserCartContext = () => useContext(UserCartContext)

