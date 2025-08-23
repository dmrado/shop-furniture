'use client'

import { useEffect } from 'react'
//fixme не работает, да и не нужен
export default function Error({
    error, //в error.message попдает строка из  throw new Error (message:'...')
    reset //функция, котороая при вызове пытается повторно отрендерить родительский компонент, полезно если ошибка временная
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <main className="flex ">
            <h2 className="bg-red-600 text-blue-700 items-end justify-end z-40 text-center">
                Что-то пошло не так! {error.message} : {error.name}
            </h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    )
}
