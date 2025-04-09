'use client'
import React, {useState, Fragment} from 'react'
import {nodeMailerInstantOrder} from '@/actions/NodeMailerInstantOrder'
import {Description, Dialog} from '@headlessui/react'
import Success from '@/components/site/Success'
import Agreement from '@/components/site/Agreement'
import GoogleCaptcha from '@/components/site/GoogleCaptcha'
import {updateUserNameAction} from '@/actions/userActions'
import Modal from '@/components/site/Modal'
import {Profile} from '@/db/models/profile.model'

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
//пользователь хочет изменить имя в провайдере на ФИО.
const UserNameForm = ({user, onClose}: {
    user: Pick<Profile, 'name' | 'surName' | 'fatherName' | 'isAgreed' | 'id'> & {
        email: string
        photo: string
    }
    isOpenModal: boolean;
    onClose: () => void;
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
            super(message)
            this.name = 'ValidationError'
        }
    }

    const onSubmit = async (formData: FormData) => {

        const name = formData.get('name')
        const fatherName = formData.get('fatherName')
        const surName = formData.get('surName')

        if (typeof name !== 'string' || typeof fatherName !== 'string' || typeof surName !== 'string') {
            throw new ValidationError('Filedata in text fields')
        }
        if (!name || !fatherName || !surName) {
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
            const userId = user.id
            await updateUserNameAction({userId, name, fatherName, surName})
        } catch (error) {
            console.error('Ошибка:', error)
        } finally {
            setIsClosing(false)
            setSuccess(true)
            setTimeout(() => {
                onClose()
            }, 2000) // а то success не видно
        }
        // это дублирующий варинат блока try выше последовательной отправки письма и сохраненипыя в БД, не проверял какой работает лучше.
        // send by mail independently
        // const successMail = await nodeMailerInstantOrder({name, fatherName, surName})
        // if (successMail) {
        //     setSuccess(true)
        //     alert('Заявка успешно отправлена, ожидайте звонка для оформления заказа!')
        // }
        // store to DB
        // const result = await   updateUserNameAction({name, fatherName, surName})
        // console.log('newInstantUser from InstantOrderModal', result)
        setIsClosing(false)
    }

    return <>
        <form className="space-y-8" action={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    name="name"
                    defaultValue=""
                    label="Имя*"
                    id="given-name"
                    autoComplete="given-name"
                    type="text"
                />
                <InputField
                    name="fatherName"
                    defaultValue=""
                    label="Отчество*"
                    id="second-name"
                    autoComplete="additional-name"
                    type="text"
                />
                <InputField
                    name="surName"
                    defaultValue=""
                    label="Фамилия*"
                    id="family-name"
                    autoComplete="family-name"
                    type="text"
                />
            </div>

            <input hidden value={captchaToken}/>

            {/* Accordion section */}
            <Agreement
                setAgreed={setAgreed}
                agreed={agreed}
                userId={user.id}
            />

            {/* Buttons section */}
            <div
                className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                <div className="flex justify-center">
                    <GoogleCaptcha onTokenChange={(token) => {
                        setCaptchaToken(token)
                    }}/>
                </div>

                {success && <Success props={'изменено'}/>}

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
                    onClick={() => setTimeout(() => {
                        onClose()
                    }, 2000)}

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
    </>
}

export default UserNameForm