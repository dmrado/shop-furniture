'use client'
import {useCallback, useRef, useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import {nodeMailerInstantOrder} from '@/actions/NodeMailerInstantOrder'
import Link from "next/link";
import {Disclosure, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import ConfidentialPolicy from "@/components/site/ConfidentialPolicy";
import {isAgreedFromModelAction, updateUserAgreementAction} from "@/actions/userActions";
import Success from "@/components/Success";

export const InputField = ({label, type, value, onChange, required = true}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                    peer
                    w-full
                    h-12
                    px-4
                    pt-4
                    border-2
                    rounded-lg
                    bg-transparent
                    outline-none
                    transition-all
                    ${isFocused ? 'border-indigo-600' : 'border-gray-300'}
                    ${value ? 'pt-4' : ''}
                    focus:pt-4
                    focus:border-indigo-600
                `}
            />
            <label
                className={`
                    absolute
                    left-4
                    transition-all
                    pointer-events-none
                    ${value || isFocused ? 'text-xs top-1' : 'text-base top-3'}
                    ${isFocused ? 'text-indigo-600' : 'text-gray-500'}`
                }
            >
                {label}
            </label>
        </div>
    );
};

export const InstantOrderModal = ({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    // fixme ???
    const [captchaValue, setCaptchaValue] = useState<string | null>(null)

    // для аккордеона согласия на обработку перс данных
    // хранит состояние самого чекбокса
    const [agreed, setAgreed] = useState(false)
    // передает состояние согласия на обработку перс данных в БД через server action
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    // управляет закрытием Disclosure с политикой
    const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);
    const disclosureButtonRef = useRef<HTMLButtonElement | null>(null);
    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // todo put real userId
        const userId = 1
        const newCheckedState = e.target.checked
        e.preventDefault()
        await updateUserAgreementAction(userId, newCheckedState)
        setAgreed(newCheckedState)
        setIsAgreed(newCheckedState)
        if (newCheckedState && disclosureButtonRef.current) {
            if (disclosureButtonRef.current) {
                disclosureButtonRef.current.click();
            }
        }
        //  todo выстроить логику checked если пользователь хочет купить другой товар мгновенно - должно быть checked, но при оформлении зщаказа на обычной странице еще раз отметить согласие? и сделать весь этот Disclosure переиспользуемым
    }

    // для показа сообщения пользователю об успехе отправки заказа перед закрытиекм модального окна
    const [success, setSuccess] = useState(false)
    // в момент отправки меняет надпись на кнопке
    const [isClosing, setIsClosing] = useState(false);
    const handleClose = useCallback(() => {
        setIsClosing(true);
        const timeoutId = setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [onClose]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isClosing || !agreed || !isAgreedFromModelAction) return;
        if (!captchaValue) {
            alert('Пожалуйста, подтвердите, что вы не робот')
            return
        }
        if (!agreed) {
            alert('Необходимо согласие на обработку персональных данных')
            return
        }

        // try {
        // todo заменить отправку captchaValue на проверку в nodeMailerInstantOrder-е на наш функционал
        const success = await nodeMailerInstantOrder({name, phone, captchaValue})
        if (success) {
            setSuccess(true)
        }
        alert('Заявка успешно отправлена, ожидайте звонка для оформления закза!')
        onClose()
        // } catch (error) {
        //     alert('Произошла ошибка при отправке заявки')
        // }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl">
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-8 text-gray-700">
                        Мгновенное оформление заказа
                    </h2>

                    <form className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Имя"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <InputField
                                label="Телефон"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Accordion section */}
                        <Disclosure
                            as="div"
                            open={isDisclosureOpen}
                            onChange={setIsDisclosureOpen}
                        >
                            {({open}) => (
                                <>
                                    <Disclosure.Button
                                        ref={disclosureButtonRef}
                                        type="button"
                                        className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                                        <div className="w-full">
                                            <h1 className="text-center w-full text-lg font-bold text-gray-700">
                                                Ознакомиться с политикой обработки персональных данных
                                            </h1>
                                        </div>
                                        <ChevronDownIcon
                                            className={`${
                                                open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-gray-500 transition-transform`}
                                        />
                                    </Disclosure.Button>

                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">

                                            {/* Здесь текст политики */}
                                            <ConfidentialPolicy/>

                                            {/* Agreement checkbox */}
                                            <div className="flex items-start mt-6">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="agreement"
                                                        type="checkbox"
                                                        checked={agreed}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                <label htmlFor="agreement" className="ml-3 text-sm text-gray-700">
                                                    Я согласен на обработку персональных данных в соответствии с
                                                    настоящей политикой согласно Федеральному закону от 27.07.2006 №
                                                    152-ФЗ «О персональных данных».
                                                </label>
                                            </div>

                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>

                        {/* Buttons section */}
                        <div
                            className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                            <div className="flex justify-center">
                                <ReCAPTCHA
                                    sitekey="BLA_BLA_BLA"
                                    // sitekey={process.env.RECAPTCHA_SERVER_SECRET}
                                    onChange={(value) => setCaptchaValue(value)}
                                />
                            </div>
                            {/*todo remove <!>*/}
                            {success && <Success/>}

                            <button
                                type="button"
                                onClick={() => {
                                    onClose()
                                    setAgreed(false)
                                    setIsDisclosureOpen(false)
                                }}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                            >
                                Отмена
                            </button>

                            <button
                                type="submit"
                                // onClick={e => handleSubmit(e)}
                                // disabled={isClosing || !agreed}
                                // disabled={isClosing || agreed || !isAgreedFromModelAction}

                                // todo переписать вот так? функционал с disabled={!agreed} на получение состояния agreed из БД серверным экшеном
                                onClick={e => {
                                    if (isClosing || !isAgreedFromModelAction) return
                                    handleSubmit(e)
                                }}
                                disabled={isClosing || !agreed || !isAgreedFromModelAction}


                                className={`
                                    w-full sm:w-auto px-6 py-2.5 rounded-lg transition-all duration-200
                                    ${agreed
                                    ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`
                                }
                            >
                                {isClosing ? 'Отправка...' : 'Отправить'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}