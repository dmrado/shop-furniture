'use client'
import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react'
import { CartRow, getCart, deleteCartRowAction, updateQuantityAction } from '@/actions/cartActions'
import { putProductToCartAction } from '@/actions/productActions'

const CartContext = createContext({
    finalAmount: 0,
    total: 0,
    totalDiscount: 0,
    totalDiscountPercent: 0,
    count: 0,
    cartRows: [] as CartRow[],
    isLoading: false,
    updateQuantity: async (id: number, quantity: number) => {},
    deleteCartRow: async (id: number) => {},
    addProductToCart: async (id: number) => {}
})

export const CartProvider = ({ children }: {children: ReactNode}) => {
    const [ cartRows, setCartRows ] = useState<CartRow[]>([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true)
            const rows = await getCart()
            setCartRows(rows)
            setIsLoading(false)
            console.log('rows', rows)
        }
        fetchCart()
    }, [])

    const updateQuantity = async (cartId: number, newQuantity: number): Promise<void> => {
        const updatedCartRow = await updateQuantityAction({ id: cartId, newQuantity })
        const updatedCartRows = cartRows.map(row =>
            row.id === updatedCartRow.id
                ? updatedCartRow
                : row
        )
        setCartRows(updatedCartRows)
    }

    const deleteCartRow = async (id: number) => {
        await deleteCartRowAction(id)
        const updatedCartRows = cartRows.filter(row => row.id !== id)
        setCartRows(updatedCartRows)
    }

    const addProductToCart = async (productId: number) => {
        const newCartRow = await putProductToCartAction(productId)
        const updatedCartRows = [newCartRow, ...cartRows]
        setCartRows(updatedCartRows)
    }

    const total = cartRows.reduce((sum, item) =>
        sum + item.product.old_price * item.quantity, 0)

    // const totalDiscount = cartRows.reduce((acc, item) =>
    //     acc + (item.product?.old_price - item.product?.new_price) * item?.quantity, 0)

    // Расчет общей скидки в процентах
    const totalOldPrice = cartRows.reduce((sum, item) =>
        sum + (item.product?.old_price || 0) * item.quantity, 0)
    const totalNewPrice = cartRows.reduce((sum, item) =>
        sum + (item.product?.new_price || 0) * item.quantity, 0)

    const totalDiscount = totalOldPrice - totalNewPrice

    const totalDiscountPercent = totalDiscount / totalOldPrice * 100

    const finalAmount = total - totalDiscount

    const value = {
        isLoading,
        total,
        totalDiscount,
        finalAmount,
        totalDiscountPercent,
        count: cartRows.length,
        cartRows,
        addProductToCart,
        updateQuantity,
        deleteCartRow,
    }
    console.warn('>>> >>>>>>>>>>>> finalAmount', finalAmount, 'total', total, 'totalDiscount', totalDiscount)

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCartContext = () => useContext(CartContext)
