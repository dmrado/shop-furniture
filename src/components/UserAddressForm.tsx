import React, {useState} from 'react'
import {handleUserAddressForm} from "@/actions/handleUserAddressForm"
import {User} from "next-auth"

// todo удалить DefaultUser - это памятка что там за User расширяет DefaultUser в next-auth
// export interface DefaultUser {
//     id: string
//     name?: string | null
//     email?: string | null
//     image?: string | null
// }


const UserAddressForm = ({user} : User ) => {

    // Состояние для сохранения в БД адреса доставки адреса доставки
    const [deliveryAddress, setDeliveryAddress] = useState({
        fullNameReceiver: '',
        street: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setDeliveryAddress({ ...deliveryAddress, [name]: value })
    }

    const onSubmit = (formData: FormData) => {
        console.log('Адрес доставки:', deliveryAddress)
        handleUserAddressForm(deliveryAddress)
    }

    return <div>
        {/* Список адресов доставки */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ваши адреса</h2>
            {user.userAddress.length === 0 ? (
                <p>Нет зарегистрированных адресов доставки</p>
            ) : (
                <>
                    <ul className="mb-4">
                            {user.userAddress?.map(item =>
                                <li key={item.id} className="flex justify-between mb-2">
                                    <span>Получатель: {item.fullNameReceiver}; {item.postalCode}; {item.city}; {item.street}; Телефон: {item.phoneNumber}</span>
                                </li>
                            )}
                    </ul>
                </>
            )}
        </div>

        {/* Форма ввода адреса доставки */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
            <form action={onSubmit}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="ФИО получателя"
                    value={deliveryAddress.fullNameReceiver}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="street"
                    placeholder="Улица, дом, квартира"
                    value={deliveryAddress.street}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Город"
                    value={deliveryAddress.city}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Почтовый индекс"
                    value={deliveryAddress.postalCode}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Номер телефона"
                    value={deliveryAddress.phoneNumber}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded" >Добавить адрес</button>
            </form>
        </div>

        </div>
}

export default UserAddressForm