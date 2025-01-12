import React from 'react'

const QuantitySelector = ({ count, onCountChange, disabled }: any) => {
    return <>
        <button
            onClick={() => {
                onCountChange(count - 1)
            }}
            disabled={disabled || count === 1}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            -
        </button>
        <input
            onChange={async (event) => {
                const newValue = event.target.value
                console.log('newValue', newValue)
                //по букве сработает ретурн, по пробелу и пустой строке вернет 0 и обнулит в БД значени поэтому проверяем приведеенное к числу значение
                const quantity = Number(newValue)
                if (isNaN(quantity)) {
                    return
                }
                onCountChange(quantity)
            }}
            readOnly={disabled}
            type="text"
            value={count}
            className="w-16 text-center border border-gray-300 rounded-lg p-1
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent
                       "
        />
        <button
            onClick={() => {
                onCountChange(count + 1)
            }}
            disabled={disabled}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            +
        </button>
    </>
}

export default QuantitySelector
