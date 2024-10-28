import React, {useState} from 'react'
import {handleUserAddressForm} from '@/actions/user/handleUserAddressForm'
import {User} from "next-auth"
import {it} from "node:test";

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
        const { name, value } = e.target;
        setDeliveryAddress((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = (deliveryAddress: FormData) => {
        console.log('Адрес доставки:', deliveryAddress)
        handleUserAddressForm(deliveryAddress)
    }

    return <div>

        {/* Форма ввода адреса доставки */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
            <form action={onSubmit}>
                <input
                    type="text"
                    name="fullNameReceiver"
                    placeholder="ФИО получателя"
                    value={deliveryAddress.fullNameReceiver}
                    onChange={handleChange}
                    // required
                    className="border p-2 mb-2 w-full rounded-md"
                />

                <input
                    type="text"
                    name="street"
                    placeholder="Улица, дом, квартира"
                    value={deliveryAddress.street}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full rounded-md"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Город"
                    value={deliveryAddress.city}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full rounded-md"
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Почтовый индекс"
                    value={deliveryAddress.postalCode}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full rounded-md"
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Номер телефона"
                    value={deliveryAddress.phoneNumber}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 w-full rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded" >Добавить адрес</button>
            </form>
        </div>

        </div>
}

export default UserAddressForm