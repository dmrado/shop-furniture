import React from 'react'

const UserCartTotalAmount = ({finalUserCartAmount}) => {
    return (
        <div className="text-2xl text-green-600 font-bold">
            Итого: {finalUserCartAmount} ₽
        </div>
    )
}

export default UserCartTotalAmount