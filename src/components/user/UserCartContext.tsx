'use client'
import {createContext, useContext, useState} from 'react'

const UserCartContext = createContext()
export const UserCartProvider = ({children}) => {

const value = {}
return <UserCartContext.Provider value={value}>{children}</UserCartContext.Provider>
}
export const useUserCartContext = () => useContext(UserCartContext)

