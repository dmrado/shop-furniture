'use client'
import {createContext, useContext, useState, useEffect} from 'react'
const UserCartContext = createContext()
import { getFinalAmount } from '@/actions/user/getFinalAmount'

export const UserCartProvider = ({children}) => {
    const finalUserCartAmount = Number(localStorage.getItem('finalAmount')) || 0
    // const [finalUserCartAmount, setFinalUserCartAmount] = useState(0)
    //
    // useEffect(() => {
    //     const fetchAmount = async () => {
    //         const amount = await getFinalAmount()
    //         setFinalUserCartAmount(amount)
    //     }
    //     fetchAmount()
    // }, [])


    const value = { finalUserCartAmount }

    return <UserCartContext.Provider value={value}>{children}</UserCartContext.Provider>
}
export const useUserCartContext = () => useContext(UserCartContext)

