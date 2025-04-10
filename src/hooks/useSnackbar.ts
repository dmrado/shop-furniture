import { useState } from 'react'

export default function useSnackbar() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ backgroundColor, setBackgroundColor ] = useState<'black' | 'white' | string>('black')
    const [ duration, setDuration ] = useState(5000)

    const showSnackbar = (
        newMessage: string,
        newBackgroundColor: 'black' | 'white' | string = 'black',
        newDuration: number = 5000
    ) => {
        setMessage(newMessage)
        setBackgroundColor(newBackgroundColor)
        setDuration(newDuration)
        setIsOpen(true)
    }

    const hideSnackbar = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        message,
        backgroundColor,
        duration,
        showSnackbar,
        hideSnackbar
    }
}
