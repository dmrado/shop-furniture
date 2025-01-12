import React from 'react';

const QuantitySelector = ({isLoading, setIsLoading, updateQuantity, cartRow, }) => {
    return <>
        <button
            onClick={async () => {
                setIsLoading(true);
                await updateQuantity(cartRow.id, cartRow.quantity - 1);
                setIsLoading(false);
            }}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            -
        </button>
        <input
            onChange={async (event) => {
                const newValue = event.target.value;
                console.log("newValue", newValue);
                //по букве сработает ретурн, по пробелу и пустой строке вернет 0 и обнулит в БД значени поэтому проверяем приведеенное к числу значение
                if (isNaN(Number(newValue))) {
                    return;
                }
                setIsLoading(true);
                await updateQuantity(cartRow.id, Number(newValue));

                setIsLoading(false);
            }}
            readOnly={isLoading}
            type="text"
            value={cartRow.quantity}
            className="w-16 text-center border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <button
            onClick={async () => {
                setIsLoading(true);
                await updateQuantity(cartRow.id, cartRow.quantity + 1);
                setIsLoading(false);
            }}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            +
        </button>
    </>
}

export default QuantitySelector;