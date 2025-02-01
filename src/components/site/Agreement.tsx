'use client'
import React, {useRef, useState} from 'react';
import {Disclosure, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import ConfidentialPolicy from "@/components/site/ConfidentialPolicy";
import {updateUserAgreementAction} from "@/actions/userActions";

// todo возможно и чекбокс согласия сюда передать, так как от него теперь не зависит disabled кнопки "Отправить". Как Использовать здесь handleCheckboxChange если от него в родительском компоненте зависит disabled кнопка "Отправить" или нет
const Agreement = ({
                       setAgreed,
                       setIsAgreed,
                       agreed,
                   }) => {

    // управляет закрытием Disclosure с политикой
    const [isDisclosureOpen, setIsDisclosureOpen] = useState(false)

    // для корректной работы @headlessui/react
    const disclosureButtonRef = useRef<HTMLButtonElement | null>(null)


    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // todo put real userId и произвести регистрацию пользователя
        const userId = 1
        const newCheckedState = e.target.checked
        e.preventDefault()
        await updateUserAgreementAction(userId, newCheckedState)
        setAgreed(newCheckedState)
        setIsAgreed(newCheckedState)
        // если установлена галочка в чекбокс, закрываем Disclosure
        if (newCheckedState && disclosureButtonRef.current) {
                disclosureButtonRef.current.click()
        }
        //  todo пользователь хочет купить товар мгновенно, он отмечает checked, ему заводится строка в модели user, далее админ заводит полные данные во время звонка. На страницах order и profile должен быть свой функционал "отметить согласие", для этого везде использовать useEffect? на это й форме user с упрощенной регистрацией покупает без подтверждения регистрации
    }

    return (
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

    );
};

export default Agreement;