'use client'
import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PaymentMethods from "@/components/user/PaymentMethods"
import Link from "next/link"

// описывает структуру данных формы заказа
interface OrderFormData {
    name: string;
    phone: string;
    email: string;
    deliveryAddress: string;
    deliveryDate: Date | null;
    comment?: string;
}

// описывает пропсы компонента
interface UserOrderFormProps {
    addresses: string[];
    onSubmit: (orderData: OrderFormData) => void
}

const UserOrderForm: React.FC<UserOrderFormProps> = ({userAddress, onSubmit}) => {

    const [order, setOrder] = useState<OrderFormData>({
        name: '',
        phone: '',
        email: '',
        deliveryAddress: '',
        deliveryDate: null,
        comment: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date: Date | null): void => {
        setOrder(prev => ({
            ...prev,
            deliveryDate: date
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onSubmit(order)
    };
    const addresses = [
        'Улица 1, дом 1',
        'Улица 2, дом 2',
        'Улица 3, дом 3',
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Имя:</label>
                    <input
                        type="text"
                        name="name"
                        value={order.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Телефон:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={order.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Комментарий к заказу:</label>
                    <textarea
                        name="comment"
                        value={order.comment}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Адрес доставки:</label>
                    <select
                        name="deliveryAddress"
                        value={order.deliveryAddress}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Выберите адрес</option>
                        {addresses.map((address, index) => (
                            <option key={index} value={address}>{address}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Дата и время доставки:</label>
                    <DatePicker
                        selected={order.deliveryDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholderText="Выберите дату и время"
                        required
                    />
                </div>
                <PaymentMethods/>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Оформить заказ
                </button>

                <Link href={'/cart'}>
                    <button
                        className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all">
                        Вернуться
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default UserOrderForm;


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


