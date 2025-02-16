'use client'
import React, { useState, Fragment} from 'react'
import {nodeMailerInstantOrder} from '@/actions/NodeMailerInstantOrder'
import {Dialog, Transition} from '@headlessui/react'
import Success from '@/components/site/Success'
import Agreement from '@/components/site/Agreement'
import GoogleCaptcha from '@/components/site/GoogleCaptcha'
import {createInstantUserAction} from "@/actions/userActions";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handleOrderToDB} from "@/actions/user/handleOrderToDB";
import Modal from "@/components/site/Modal";

export const InputField = ({label, autoComplete, type, value, onChange, required = true, name, id}) => {
    const [isFocused, setIsFocused] = useState(false)
    // todo: make autocomplete
    return (
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
            <label htmlFor={id}
                   className={`absolute left-4 transition-all pointer-events-none
                    ${value || isFocused ? 'text-xs top-1' : 'text-base top-3'}
                    ${isFocused ? 'text-indigo-600' : 'text-gray-500'}`}
            >
                {label}
            </label>
        </div>
    )
}
//пользователь хочет купить товар мгновенно, он отмечает checked в Agreement, ему заводится строка в модели user, далее админ заводит полные данные во время звонка. На этой форме user с упрощенной регистрацией делает заказ без подтверждения регистрации
export const InstantOrderForm = ({isOpen, onClose, setIsOpen}: {
    isOpen: boolean;
    onClose: () => void;
    setIsOpen: () => void
}) => {

    const [captchaToken, setCaptchaToken] = useState<string>('')

    // для Disclosure согласия на обработку перс данных
    // хранит состояние самого чекбокса
    const [agreed, setAgreed] = useState<boolean>(false)

    // для показа сообщения пользователю об успехе отправки заказа перед закрытиекм модального окна 2 сек
    const [success, setSuccess] = useState<boolean>(false)

    // в момент отправки меняет надпись на кнопке
    const [isClosing, setIsClosing] = useState<boolean>(false)

    //+++++++start validation формы отправки мгновенного заказа+++++
    class ValidationError extends Error {
        constructor(message: string) {
            super(message);
            this.name = 'ValidationError';
        }
    }

    const onSubmit = async (formData: FormData) => {

        const name = formData.get('name')
        const phone = formData.get('phone')

        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/

        if(!phone || !phoneRegex.test(phone.toString())){
            alert('Пожалуйста, введите корректный номер телефона')
            // return
        }
        if (typeof name !== 'string' || typeof phone !== 'string') {
            throw new ValidationError('Filedata in text fields')
        }
        if (!name && !phone) {
            throw new ValidationError('Все обязательные поля должны быть заполнены')
        }
        if (!captchaToken) {
            alert('Пожалуйста, подтвердите, что вы не робот')
            return
        }
        if (!agreed) {
            alert('Необходимо согласие на обработку персональных данных')
            return
        }

        // параллельная отправка почты и сохранения в БД
        try {
            setIsClosing(true)
            const [mailSuccess, dbResult] = await Promise.all([
                nodeMailerInstantOrder({name, phone}),
                createInstantUserAction({name, phone})
            ])
            if (mailSuccess) {
                setSuccess(true)
                alert('Заявка успешно отправлена, ожидайте звонка для оформления заказа!')
                // setCaptchaToken('');
            } else {
                alert('Возникла проблема при отправке заявки. Пожалуйста, попробуйте позже.')
            }
        } catch (error) {
            console.error('Ошибка:', error)
            alert('Произошла ошибка при обработке заявки. Пожалуйста, попробуйте позже.')
        }

        // send by mail independently
        // const successMail = await nodeMailerInstantOrder({name, phone})
        // if (successMail) {
        //     setSuccess(true)
        //     alert('Заявка успешно отправлена, ожидайте звонка для оформления заказа!')
        // }
        // store to DB
        // const result = await createInstantUserAction({name, phone})
        // console.log('newInstantUser from InstantOrderModal', result)
        setIsClosing(false)
    }

    if (!isOpen) return null
    // fixme? проверить как работает  setAgreed(false)
    return <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Dialog.Title className="text-2xl font-bold mb-8 text-gray-700">
                Мгновенное оформление заказа
            </Dialog.Title>

            <form className="space-y-8" action={onSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        name="name"
                        defaultValue=""
                        label="Имя*"
                        id="given-name"
                        autoComplete="given-name"
                        autocomplete="on"
                        type="text"
                    />
                    <InputField
                        name="phone"
                        defaultValue=""
                        label="Телефон*"
                        id="tel"
                        autoComplete="tel"
                        type="tel"
                        pattern="[0-9]*"
                    />
                    <input hidden value={captchaToken}/>
                </div>

                {/* Accordion section */}
                <Agreement
                    setAgreed={setAgreed}
                    agreed={agreed}
                />
                {/* Buttons section */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                    <div className="flex justify-center">
                        <GoogleCaptcha onTokenChange={(token) => {
                            setCaptchaToken(token)
                        }}/>
                    </div>

                    {success && <Success/>}

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
                        onClick={() => setTimeout(() => {onClose()}, 2000)}
                        disabled={!agreed}
                        className={`
                                    w-full sm:w-auto px-6 py-2.5 rounded-lg transition-all duration-200
                                    ${agreed
                            ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }
                                `}
                    >
                        {isClosing ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            </form>
        </Modal>
   </>
}
