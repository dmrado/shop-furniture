'use client'
import React, { useEffect, useState } from 'react'
import { userAddressFormAction } from '@/actions/user/userAddressFormAction'
import GoogleCaptcha from '@/components/site/GoogleCaptcha'
import { Dialog } from '@headlessui/react'
import Agreement from '@/components/site/Agreement'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Success from '@/components/site/Success'
import Modal from '@/components/site/Modal'
import { useRouter } from 'next/navigation'

// import { getAddressByIdAction } from '@/actions/addressActions'

//пользователь хочет оформить заказ, но адреса нет в списке, для добавления нового адреса открываем модальное окно и сохраняем адрес в БД и добавляем в заказ

export const InputField = ({
    label,
    autoComplete,
    type,
    value,
    onChange,
    required = true,
    name,
    id
}) => {
    const [isFocused, setIsFocused] = useState(false)
    // todo: make autocomplete
    return (
        <>
            <div className="relative">
                <input
                    type={type}
                    defaultValue={value}
                    onChange={onChange}
                    required={required}
                    autoComplete={autoComplete}
                    name={name}
                    id={id}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`peer w-full h-12 px-4 pt-4 border-2 rounded-lg bg-transparent outline-none transition-all
                    ${isFocused ? 'border-indigo-600' : 'border-gray-300'}
                    ${value ? 'pt-4' : ''}
                    focus:pt-4 focus:border-indigo-600`}
                />
                <label
                    htmlFor={id}
                    className={`absolute left-4 transition-all pointer-events-none
                    ${value || isFocused ? 'text-xs top-1' : 'text-base top-3'}
                    ${isFocused ? 'text-indigo-600' : 'text-gray-500'}`}
                >
                    {label}
                </label>
            </div>
        </>
    )
}
// todo user-а все же нужно здесь передать и проверить есть такой в БД или нет. Однако на order page может попасть незарегистрированный пользователь и надо с него получить согласие на обработку перс данных и зарегистрировать
const UserAddressForm = ({ user, address, isOpenModal, onClose }) => {
    const router = useRouter()

    // todo с UserProfile он прийдет с объектом юзера, a с UserOrderForm через NewAddressModal может и с юзером и без юзера, обработать
    // if (!user) {
    //     return <div>Loading...</div>
    // }

    // для Disclosure согласия на обработку перс данных
    // хранит состояние самого чекбокса от него зависит состояние кнопки родительского компонента
    const [agreed, setAgreed] = useState<boolean>(user?.isAgreed || false)
    const [captchaToken, setCaptchaToken] = useState<string>('')
    // в момент отправки меняет надпись на кнопке кнопка в этом верхнем копоненте
    const [isClosing, setIsClosing] = useState<boolean>(false)
    //для показа сообщения пользователю об успехе отправки заказа перед закрытиекм модального окна 2 сек
    const [success, setSuccess] = useState<boolean>(false)
    // для fetchAddress
    const [status, setStatus] = useState('idle') // 'idle', 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('')

    // Адресные данные
    const [addressId, setAddressId] = useState(address?.id || null)
    const [userId, setUserId] = useState(address?.userId || '')
    const [phone, setPhone] = useState(address?.phone || '')
    const [city, setCity] = useState(address?.city || '')
    console.log('address', address)
    console.log('city', city)
    const [street, setStreet] = useState(address?.street || '')
    const [home, setHome] = useState(address?.home || '')
    const [corps, setCorps] = useState(address?.corps || '')
    const [appart, setAppart] = useState(address?.appart || '')
    const [isMain, setIsMain] = useState(address?.isMain || false)

    useEffect(() => {
        setCity(address?.city || '')
        setStreet(address?.street || '')
        setAddressId(address?.id || '')
    }, [address])

    // const fetchAddress = async (updatingAddressId: number) => {
    //     try {
    //         setStatus('loading')
    //         const data = await getAddressByIdAction(updatingAddressId)
    //         setAddress(data)
    //         setStatus('idle')
    //     } catch (error) {
    //         console.error('Ошибка при получении адреса:', error)
    //         setStatus('error')
    //         setErrorMessage('Не удалось загрузить данные адреса')
    //     }
    // }
    // useEffect(() => {
    //     if (updatingAddressId) {
    //         fetchAddress(updatingAddressId)
    //     }
    // }, [updatingAddressId])

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        if (name === 'city') {
            setCity(value)
        } else if (name === 'street') {
            setStreet(value)
        }
    }

    // вариант без предзаполненных полей
    interface DeliveryAddress {
        phone: string
        city: string
        street: string
        home: string
        corps: string
        appart: string
        isMain: boolean // добавляем поле
    }

    // const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    //     phone: '',
    //     city: '',
    //     street: '',
    //     home: '',
    //     corps: '',
    //     appart: '',
    //     isMain: false // добавляем начальное значение
    // })

    //todo переписать на нативную валидацию полей пормы с использованием хука useFormState
    //собирает в стейт deliveryAddress значения полей из формы
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const {name, value, type, checked} = e.target
    //     setDeliveryAddress(prevState => ({
    //         ...prevState,
    //         [name]: type === 'checkbox' ? checked : value
    //     }))
    // }

    // вызывает server-action для отправки данных из формы очистки и записи
    const onSubmit = async (formData: FormData) => {
        const phone = formData.get('phone')
        const phoneRegex = /^\+?[\d\s\(\)\-\.]{5,20}$/

        if (!phone || !phoneRegex.test(phone.toString())) {
            alert('Пожалуйста, введите корректный номер телефона')
            return
        }
        if (!captchaToken) {
            alert('Пожалуйста, подтвердите, что вы не робот')
            return
        }
        if (!agreed) {
            alert('Необходимо согласие на обработку персональных данных')
            return
        }

        try {
            setIsClosing(true)
            console.log('Адрес доставки:', formData)
            await userAddressFormAction(formData)
            router.refresh()
        } catch (error) {
            console.error('Ошибка при отправке формы:', error)
        } finally {
            setIsClosing(false)
            setSuccess(true)
            setTimeout(() => {
                onClose()
            }, 2000) // а то success не видно
            // onClose()
            // todo очистить форму
        }
    }

    return (
        <>
            {status === 'loading' && (
                <div className="text-center py-4">
                    <div className="spinner"></div>
                    <p>Загрузка...</p>
                </div>
            )}

            {status === 'success' && (
                <div className="text-center mb-6 py-4 text-green-600">
                    <Success props={'Адрес удален'} />
                </div>
            )}

            {status === 'error' && (
                <div className="text-center py-4 text-red-600">
                    <p>{errorMessage}</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-2 px-4 py-2 bg-gray-200 rounded"
                    >
                        Попробовать снова
                    </button>
                </div>
            )}

            <form action={onSubmit}>
                <input
                    type="text"
                    hidden={true}
                    name="id"
                    defaultValue={addressId}
                />
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-6 gap-y-4">
                    <div className="mb-4">
                        {/*<label className="block mb-1">Город:</label>*/}
                        <InputField
                            label="Город*"
                            type="text"
                            name="city"
                            value={city} // Используйте value вместо defaultValue
                            onChange={handleChange}
                            // id="given-name"
                            // autoComplete="given-name"
                            // autocomplete="on"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        {/*<label className="block mb-1">Улица:</label>*/}
                        <InputField
                            label="Улица*"
                            type="text"
                            name="street"
                            value={street}
                            onChange={handleChange}
                            // id="given-name"
                            // autoComplete="given-name"
                            // autocomplete="on"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 ">
                    <div className="mb-4">
                        {/*<label className="block mb-1">Дом:</label>*/}
                        <InputField
                            label="Дом*"
                            type="text"
                            name="home"
                            defaultValue=""
                            // onChange={handleChange}
                            // id="given-name"
                            // autoComplete="given-name"
                            // autocomplete="on"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        {/*<label className="block mb-1">Корпус:</label>*/}
                        <InputField
                            label="Корпус"
                            type="text"
                            name="corps"
                            defaultValue=""
                            // onChange={handleChange}
                            required={false}
                            // id="given-name"
                            // autoComplete="given-name"
                            // autocomplete="on"
                        />
                    </div>

                    <div className="mb-4 ">
                        {/*<label className="block mb-1">Квартира:</label>*/}
                        <InputField
                            label="Квартира"
                            type="text"
                            name="appart"
                            defaultValue=""
                            // onChange={handleChange}
                            required={false}
                            // id="given-name"
                            // autoComplete="given-name"
                            // autocomplete="on"
                        />
                    </div>

                    <div className="mb-4">
                        {/*<label className="block mb-1">Телефон:</label>*/}
                        <InputField
                            label="Телефон*"
                            type="tel"
                            name="phone"
                            defaultValue=""
                            // onChange={handleChange}
                            id="tel"
                            autoComplete="tel"
                            autocomplete="on"
                            required
                            pattern="[0-9]*"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="flex items-center justify-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="isMain"
                            defaultChecked=""
                            // onChange={handleChange}
                        />
                        <span className="text-gray-700">Сделать основным</span>
                    </label>
                </div>

                <input hidden readOnly value={captchaToken} />

                {/* Accordion section */}
                <Agreement
                    setAgreed={setAgreed}
                    agreed={agreed}
                    userId={user.id}
                />

                {/* Buttons section */}
                <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                    {success && <Success props={'адрес добавлен'} />}

                    <div className="flex justify-center">
                        <GoogleCaptcha
                            onTokenChange={(token) => {
                                setCaptchaToken(token)
                            }}
                            onError={(error) => {
                                console.error('Captcha error:', error)
                                toast.error(
                                    'Проверку на человека не прошли, простите',
                                    {
                                        position: 'top-center',
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true
                                    }
                                )
                            }}
                        />
                        {/*{process.env.NODE_ENV === 'development' && (*/}
                        {/*    <button*/}
                        {/*        onClick={() => {*/}
                        {/*            toast.error('Проверку на человека не прошли, простите')*/}
                        {/*        }}*/}
                        {/*        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"*/}
                        {/*    >*/}
                        {/*        Тест ошибки капчи*/}
                        {/*    </button>*/}
                        {/*)}*/}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            onClose()
                            setAgreed(false)
                        }}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                    >
                        Отмена
                    </button>

                    <button
                        type="submit"
                        disabled={!agreed}
                        className={`
                                    w-full sm:w-auto px-6 py-2.5 rounded-lg transition-all duration-200
                                    ${
                                        agreed
                                            ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }
                                `}
                    >
                        {isClosing ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default UserAddressForm
