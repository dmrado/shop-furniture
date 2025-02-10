'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Address } from '@/db/types/interfaces'
import { handleOrderToDB } from '@/actions/user/handleOrderToDB'
import { UserProfile } from '@/app/order/page'
import { NewAddressModal } from '@/components/user/NewAddressModal'

type Props = {
    user: UserProfile
}

const UserOrderForm = ({ user }: Props) => {
    // for NewAddressModal
    const [ isOpenModal, setIsOpenModal ] = useState(true)

    const formatAddress = (address: Address) => {
        return `${address.city}, ${address.street},
            д.${address.home} ${address.corps ? `, корп.${address.corps}` : ''} ${address.appart ? `, кв.${address.appart}` : ''}`
    }
    const mainAddress = user.addresses.find(addr => addr.isMain)

    const handleSubmit = async (formData: FormData) => {
        await handleOrderToDB(formData)
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
            {isOpenModal && <NewAddressModal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}/>
            }
            {user.name} {mainAddress?.phone} {user.email}
            <form action={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Адрес доставки:</label>
                    <select
                        name="addressId"
                        defaultValue={mainAddress?.id ?? 1}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {user.addresses.map((address: Address) => (
                            <option key={address.id} value={address.id}>
                                {formatAddress(address)}
                            </option>
                        ))}
                    </select>
                </div>

                {/*<Link href={'/profile'} className="flex flex-col max-w-sm">*/}
                <button
                    type="button"
                    onClick={() => setIsOpenModal(true)}
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                        Добавить новый адрес
                </button>
                {/*</Link>*/}
                <span className="p-2">Нажмите для добавления адреса, которого нет в выпадающем списке</span>

                <div className="my-4">
                    <label className="block mb-1">Комментарий к заказу:</label>
                    <textarea
                        name="comment"
                        defaultValue=''
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
                    />
                </div>

                {/* Способ оплаты */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Способ оплаты</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                className="mr-2"
                            />
                            Наличные курьеру
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                className="mr-2"
                            />
                            Карта курьеру
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="online"
                                className="mr-2"
                            />
                            Онлайн на сайте
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select
                        Date</label>
                    {/*todo make defaultValue in 1 week*/}
                    <input
                        min={new Date().toISOString().split('T')[0]}
                        // max={new Date().toISOString().split('T')[0]}
                        type="date"
                        name="deliveryDate"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        id="date"
                        className="block w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
                    />
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Select
                        Time</label>
                    <input
                        type="time"
                        min="08:00"
                        name="deliveryTime"
                        max="22:00"
                        id="time"
                        className="block w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
                    />

                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Отправить
                </button>
            </form>

            <Link href={'/cart'}>
                <button
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                    Вернуться в корзину
                </button>
            </Link>

            <Link href={'/products'}>
                <button
                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                    Хочу больше!
                </button>
            </Link>
        </div>
    )
}

export default UserOrderForm
