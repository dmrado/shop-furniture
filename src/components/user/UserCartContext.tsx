'use client'
import {createContext, useContext} from 'react'

const UserCartContext = createContext()

export const UserCartProvider = ({children}) => {
    const finalUserCartAmount = Number(localStorage.getItem('finalAmount')) || 0

    const value = { finalUserCartAmount }

    return <UserCartContext.Provider value={value}>{children}</UserCartContext.Provider>
}
export const useUserCartContext = () => useContext(UserCartContext)

