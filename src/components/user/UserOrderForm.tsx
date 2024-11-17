'use client'
import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PaymentMethods from "@/components/user/PaymentMethods"
import Link from "next/link"
import {Address} from "@/db/types/interfaces"
import {handleOrderToDB} from "@/actions/user/handleOrderToDB";

//todo Это слитые две модели UserModel + AddressModel но без некоторых свойств
// Сравнивая два списка, в OrderFormData не хватает следующих полей, которые есть в UserProfile: возможно стоит слить имя и отчесатво в name позже
//
// 1. surName
// 2. fatherName
// 3. isActive
// 4. canContact
//При этом в OrderFormData списке есть дополнительные поля, которых нет в UserProfile:
// 1. building
// 2. paymentMethod
// 3. comment
// 4. deliveryDate

type OrderFormData = {
    selectedAddress: string | readonly string[] | number | undefined;
    id?: number;
    userId?: number;
    phone: string;
    // city: string;
    // street: string;
    // home: string;
    // building: string;
    // corps: string;
    // appart: string;
    isMain: boolean;
    paymentMethod: 'cash' | 'card' | 'online';
    name: string;
    email: string;
    comment: string;
    deliveryDate: Date | null;
};

//todo нужно это?
interface UserOrderFormProps {
    userAddress?: string;
    onSubmit: (orderData: OrderFormData) => void;
}

//todo позже статус заказа перенести в профиль понадобится миниатюра заказа

const UserOrderForm = ({user, onSubmit}) => {

    // Создаем строки адресов для select
    //todo правильно расставить обратные кавычки и убрать <p>
    const formatAddress = (address: Address) => {
        return `${address.city}, ${address.street},
            д.${address.home} ${address.corps ? `, корп.${address.corps}` : ''} ${address.appart ? `, кв.${address.appart}` : ''}`
    }

// Находим основной адрес
    const mainAddress = user.addresses.find(addr => addr.isMain);


// Инициализируем начальное состояние формы
    //todo isMain не отрабатывает
   //  const [order, setOrder] = useState<OrderFormData>({
   //      // todo addressId:
   // });

// Состояние для выбранного адреса
//     const [selectedAddress, setSelectedAddress] = useState(
//         mainAddress ? formatAddress(mainAddress) : ''
//     );
//
// Форматируем все адреса для select
//     const addressOptions = user.addresses.map(addr => ({
//         addressId: addr.id,
//         value: formatAddress(addr)
//     }));

// Обработчик изменения адреса в select
//     const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const  [id, value] = e.target.value.split('|');

        // Находим выбранный адрес в массиве
    //     const selectedAddressData = addressOptions.find(opt => opt.value === selectedValue)?.address;
    //
    //     if (selectedAddressData) {
    //         setOrder(prev => ({
    //             ...prev,
    //             // city: selectedAddressData.city,
    //             // street: selectedAddressData.street,
    //             // home: selectedAddressData.home,
    //             // corps: selectedAddressData.corps || '',
    //             // apartment: selectedAddressData.appart || '',
    //             selectedAddress: selectedAddressData.selectedAddress,
    //             phone: selectedAddressData.phone
    //         }));
    //     }
    // };


    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setOrder(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleDateChange = (date) => {
    //     setOrder(prev => ({
    //         ...prev,
    //         deliveryDate: date
    //     }));
    // };

    const handleSubmit = async (formData: FormData) => {
        await handleOrderToDB(formData)
    }


    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
            {user.name} {mainAddress.phone} {user.email}
            <form action={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Адрес доставки:</label>
                    <select
                        name="selectedAddress"
                        defaultValue={mainAddress.id}
                        // onChange={handleAddressChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {user.addresses.map((address, index) => (
                            <option key={index} value={address.id}>
                                {formatAddress(address)}
                            </option>
                        ))}
                    </select>
                </div>
                <Link href={'/profile'}>
                    <button
                        className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                        Добавить адрес
                    </button>
                </Link>

                <div className="mb-4">
                    <label className="block mb-1">Комментарий к заказу:</label>
                    <textarea
                        name="comment"
                        defaultValue=''
                        // onChange={handleChange}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
                    />
                </div>

                {/* Способ оплаты */}
                {/*<div className="mb-6">*/}
                {/*    <h3 className="text-xl font-semibold mb-4">Способ оплаты</h3>*/}
                {/*    <div className="space-y-2">*/}
                {/*        <label className="flex items-center">*/}
                {/*            <input*/}
                {/*                type="radio"*/}
                {/*                name="paymentMethod"*/}
                {/*                value="cash"*/}
                {/*                checked={order.paymentMethod === 'cash'}*/}
                {/*                onChange={handleChange}*/}
                {/*                className="mr-2"*/}
                {/*            />*/}
                {/*            Наличные курьеру*/}
                {/*        </label>*/}
                {/*        <label className="flex items-center">*/}
                {/*            <input*/}
                {/*                type="radio"*/}
                {/*                name="paymentMethod"*/}
                {/*                value="card"*/}
                {/*                checked={order.paymentMethod === 'card'}*/}
                {/*                onChange={handleChange}*/}
                {/*                className="mr-2"*/}
                {/*            />*/}
                {/*            Карта курьеру*/}
                {/*        </label>*/}
                {/*        <label className="flex items-center">*/}
                {/*            <input*/}
                {/*                type="radio"*/}
                {/*                name="paymentMethod"*/}
                {/*                value="online"*/}
                {/*                checked={order.paymentMethod === 'online'}*/}
                {/*                onChange={handleChange}*/}
                {/*                className="mr-2"*/}
                {/*            />*/}
                {/*            Онлайн на сайте*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="mb-4">*/}
                {/*    <label className="block mb-1">Дата и время доставки:</label>*/}

                {/*    <DatePicker*/}
                {/*        selected={order.deliveryDate}*/}
                {/*        onChange={handleDateChange}*/}
                {/*        showTimeSelect*/}
                {/*        dateFormat="Pp"*/}
                {/*        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"*/}
                {/*        placeholderText="Выберите дату и время"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<PaymentMethods/>*/}
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


// 'use client'
// import React, {useState} from 'react'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import PaymentMethods from "@/components/user/PaymentMethods"
// import Link from "next/link"
//
// // описывает структуру данных формы заказа
// interface OrderFormData {
//     name: string;
//     phone: string;
//     email: string;
//     deliveryAddress: string;
//     deliveryDate: Date | null;
//     comment?: string;
// }
//
// // описывает пропсы компонента
// const UserOrderForm: React.FC<UserOrderFormProps> = ({userAddress, onSubmit}) => {
//
//     const [order, setOrder] = useState<OrderFormData>({
//         city: '',
//         street: '',
//         house: '',
//         building: '',
//         floor: '',
//         apartment: '',
//         lastName: '',
//         firstName: '',
//         phone: '',
//         paymentMethod: 'cash'
//     })
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
//         const {name, value} = e.target
//         setOrder(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };
//
//     const handleDateChange = (date: Date | null): void => {
//         setOrder(prev => ({
//             ...prev,
//             deliveryDate: date
//         }));
//     };
//
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//         e.preventDefault()
//         onSubmit(order)
//     };
//     const addresses = [
//         'Улица 1, дом 1',
//         'Улица 2, дом 2',
//         'Улица 3, дом 3',
//     ];
//
//     return (<>
//
//         <div className="max-w-6xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Адрес доставки */}
//                 <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-4">Адрес доставки</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="mb-4">
//                             <label className="block mb-1">Город:</label>
//                             <input
//                                 type="text"
//                                 name="city"
//                                 value={order.city}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Улица:</label>
//                             <input
//                                 type="text"
//                                 name="street"
//                                 value={order.street}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Дом:</label>
//                             <input
//                                 type="text"
//                                 name="house"
//                                 value={order.house}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Корпус:</label>
//                             <input
//                                 type="text"
//                                 name="building"
//                                 value={order.building}
//                                 onChange={handleChange}
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Этаж:</label>
//                             <input
//                                 type="number"
//                                 name="floor"
//                                 value={order.floor}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Квартира:</label>
//                             <input
//                                 type="text"
//                                 name="apartment"
//                                 value={order.apartment}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Получатель */}
//                 <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-4">Получатель</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="mb-4">
//                             <label className="block mb-1">Фамилия:</label>
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={order.lastName}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Имя:</label>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={order.firstName}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Телефон для связи:</label>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={order.phone}
//                                 onChange={handleChange}
//                                 required
//                                 className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Способ оплаты */}
//                 <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-4">Способ оплаты</h3>
//                     <div className="space-y-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="cash"
//                                 checked={order.paymentMethod === 'cash'}
//                                 onChange={handleChange}
//                                 className="mr-2"
//                             />
//                             Наличные курьеру
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="card"
//                                 checked={order.paymentMethod === 'card'}
//                                 onChange={handleChange}
//                                 className="mr-2"
//                             />
//                             Карта курьеру
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="online"
//                                 checked={order.paymentMethod === 'online'}
//                                 onChange={handleChange}
//                                 className="mr-2"
//                             />
//                             Онлайн на сайте
//                         </label>
//                     </div>
//                 </div>
//
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                     Оформить заказ
//                 </button>
//             </form>
//         </div>
//         );
//
//         <div className="max-w-6xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block mb-1">Имя:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={order.name}
//                         onChange={handleChange}
//                         required
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">Телефон:</label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={order.phone}
//                         onChange={handleChange}
//                         required
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={order.email}
//                         onChange={handleChange}
//                         required
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">Комментарий к заказу:</label>
//                     <textarea
//                         name="comment"
//                         value={order.comment}
//                         onChange={handleChange}
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">Адрес доставки:</label>
//                     <select
//                         name="deliveryAddress"
//                         value={order.deliveryAddress}
//                         onChange={handleChange}
//                         required
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     >
//                         <option value="">Выберите адрес</option>
//                         {addresses.map((address, index) => (
//                             <option key={index} value={address}>{address}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">Дата и время доставки:</label>
//                     <DatePicker
//                         selected={order.deliveryDate}
//                         onChange={handleDateChange}
//                         showTimeSelect
//                         dateFormat="Pp"
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         placeholderText="Выберите дату и время"
//                         required
//                     />
//                 </div>
//                 <PaymentMethods/>
//                 {/*++++++++++++++++++++++++++++++++++++++++++++++++*/}
//
//
//                 {/*+++++++++++++++++++++++++++++++++++++++++++++++++*/}
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
//                     Отправить
//                 </button>
//
//                 <Link href={'/cart'}>
//                     <button
//                         className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
//                         Вернуться в корзину
//                     </button>
//                 </Link>
//
//
//                 <Link href={'/products'}>
//                     <button
//                         className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
//                         Хочу больше!
//                     </button>
//                 </Link>
//             </form>
//         </div>
//     </> )
// }

// interface UserOrderFormProps {
//     addresses: string[];
//     onSubmit: (orderData: OrderFormData) => void
// }
//
// export default UserOrderForm
//

// 'use client'
// import React, { useState } from 'react'
// import { useRouter } from "next/router"
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
//
// //todo получение адресов доставки или на странице profile выбор тоглером са передачей адреса сразу в форму ИЛИ ВООБЩЕ СДЕЛАТЬ ЗАКАЗ НА СТРАНИЦЕ DASHBOARD отметить "чекед" выбранные заказы, посчитать по ним сумму выбрать адрес, дату и время и отпроавить на email службы доставки.
// const UserOrderForm = () => {
//     const [order, setOrder] = useState({
//         productName: '',
//         quantity: '',
//         customerName: '',
//         customerEmail: '',
//         customerPhone: '',
//         deliveryDate: null,
//         deliveryAddress: '' // Добавлено состояние для адреса доставки
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setOrder(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//
//     const handleDateChange = (date) => {
//         setOrder(prevState => ({
//             ...prevState,
//             deliveryDate: date
//         }));
//     };
//
//     const onSubmit = (e) => {
//         e.preventDefault();
//         // Здесь обработка отправки формы
//         console.log(order); // Выводим данные в консоль для проверки
//     };
//
//     return (
//         <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Оформление заказа</h2>
//             <form onSubmit={onSubmit}>
//                 <input
//                     type="text"
//                     name="productName"
//                     placeholder="Название товара"
//                     value={order.productName}
//                     onChange={handleChange}
//                     required
//                     className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="number"
//                     name="quantity"
//                     placeholder="Количество"
//                     value={order.quantity}
//                     onChange={handleChange}
//                     required
//                     className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="text"
//                     name="customerName"
//                     placeholder="Имя покупателя"
//                     value={order.customerName}
//                     onChange={handleChange}
//                     required
//                     className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="email"
//                     name="customerEmail"
//                     placeholder="Email покупателя"
//                     value={order.customerEmail}
//                     onChange={handleChange}
//                     required
//                     className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="tel"
//                     name="customerPhone"
//                     placeholder="Телефон покупателя"
//                     value={order.customerPhone}
//                     onChange={handleChange}
//                     required
//                     className="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <div className="mb-4">
//                     <label className="block mb-1">Адрес доставки:</label>
//                     <select
//                         name="deliveryAddress"
//                         value={order.deliveryAddress}
//                         onChange={handleChange}
//                         required
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     >
//                         <option value="">Выберите адрес</option>
//                         {addresses.map((address, index) => (
//                             <option key={index} value={address}>{address}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">Дата и время доставки:</label>
//                     <DatePicker
//                         selected={order.deliveryDate}
//                         onChange={handleDateChange}
//                         showTimeSelect
//                         dateFormat="Pp"
//                         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         placeholderText="Выберите дату и время"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
//                     Оформить заказ
//                 </button>
//             </form>
//         </div>
//     );
// };
// export default UserOrderForm


