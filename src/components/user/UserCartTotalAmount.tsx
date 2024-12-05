import React from 'react'

const UserCartTotalAmount = ({total, totalDiscount}) => {
    return (
        <div className="text-2xl text-green-600 font-bold">
            Итого: {total.toFixed(2) - totalDiscount.toFixed(2)} ₽
        </div>
    )
}

export default UserCartTotalAmount