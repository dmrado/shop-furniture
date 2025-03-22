'use client'
import React, { useEffect, useRef } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import ConfidentialPolicy from '@/components/site/ConfidentialPolicy'
import { isAgreedFromModelAction, updateUserAgreementAction } from '@/actions/userActions'

type Props = {
    setAgreed: (value: boolean) => void,
    agreed: boolean,
    userId?: string
}

const Agreement = ({ setAgreed, agreed, userId }: Props) => {

    // для корректной работы @headlessui/react
    const disclosureButtonRef = useRef<HTMLButtonElement | null>(null)

    // проверяем состояние согласия на обработку перс данных
    useEffect(() => {
        const checkAgreedStatus = async () => {
            if(userId) {
                const result = await isAgreedFromModelAction(userId)
                console.log('result from DB:', result)
                setAgreed(result)
            }
        }
        void checkAgreedStatus()
    }, [])

    // покупка без регистрации и без сохранения isAgreed в БД
    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newCheckedState = e.target.checked
        if (userId) {
            await updateUserAgreementAction(userId, newCheckedState)
        }
        setAgreed(newCheckedState) // устанавливает состояние самого чекбокса при нажатии
        // если установлена галочка в чекбокс, закрываем Disclosure
        if (newCheckedState && disclosureButtonRef.current) {
            disclosureButtonRef.current.click()
        }
    }
    return (

        <Disclosure>
            {({ open }) => (
                <>
                    <DisclosureButton
                        ref={disclosureButtonRef}
                        type="button"
                        className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-3 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                        <div className="w-full">
                            <h1 className="text-center w-full text-lg font-bold text-gray-700">
                                Ознакомиться с политикой обработки персональных данных
                            </h1>
                        </div>
                        <ChevronDownIcon className={clsx('w-5', open && 'rotate-180')} />
                    </DisclosureButton>

                    <DisclosurePanel
                        transition
                        className="origin-top transition duration-300 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 px-4 pt-4 pb-2 text-sm text-gray-500"
                    >

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

                    </DisclosurePanel>
                </>
            )}
        </Disclosure>

    )
}
export default Agreement

// todo удалить если нек нужен. Это вариант компонента выше только без hedless.ui-библиотеки

// 'use client'
// import React, { useEffect, useRef } from 'react'
// import { ChevronDownIcon } from '@heroicons/react/24/outline'
// import ConfidentialPolicy from '@/components/site/ConfidentialPolicy'
// import { isAgreedFromModelAction, updateUserAgreementAction } from '@/actions/userActions'
//
// type Props = {
//     setAgreed: (value: boolean) => void,
//     agreed: boolean,
//     userId?: string
// }
//
// const Agreement = ({ setAgreed, agreed, userId }: Props) => {
//     // Создаем ref для кнопки раскрытия
//     const disclosureButtonRef = useRef<HTMLButtonElement | null>(null)
//     // Состояние для отслеживания открытия/закрытия панели
//     const [ isOpen, setIsOpen ] = React.useState(false)
//
//     // проверяем состояние согласия на обработку перс данных
//     useEffect(() => {
//         const checkAgreedStatus = async () => {
//             if (userId) {
//                 const result = await isAgreedFromModelAction(userId)
//                 console.log('result from DB:', result)
//                 setAgreed(result)
//             }
//         }
//         void checkAgreedStatus()
//     }, [])
//
//     // покупка без регистрации и без сохранения isAgreed в БД
//     const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault()
//         const newCheckedState = e.target.checked
//         if (userId) {
//             await updateUserAgreementAction(userId, newCheckedState)
//         }
//         setAgreed(newCheckedState) // устанавливает состояние самого чекбокса при нажатии
//         // если установлена галочка в чекбокс, закрываем Disclosure
//         if (newCheckedState && disclosureButtonRef.current) {
//             disclosureButtonRef.current.click()
//         }
//     }
//
//     // Обработчик клика по кнопке раскрытия
//     const toggleDisclosure = () => {
//         setIsOpen(!isOpen)
//     }
//
//     return (
//         <div className="w-full">
//             <div className="mx-auto w-full rounded-2xl bg-white p-2">
//                 <div className="rounded-lg">
//                     {/* Кнопка раскрытия */}
//                     <button
//                         ref={disclosureButtonRef}
//                         type="button"
//                         className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
//                         onClick={toggleDisclosure}
//                     >
//                         <div className="w-full">
//                             <h1 className="text-center w-full text-lg font-bold text-gray-700">
//                                 Ознакомиться с политикой обработки персональных данных
//                             </h1>
//                         </div>
//                         <ChevronDownIcon
//                             className={`${
//                                 isOpen ? 'rotate-180 transform' : ''
//                             } h-5 w-5 text-gray-500`}
//                         />
//                     </button>
//
//                     {/* Панель с содержимым */}
//                     <div
//                         className={`px-4 pt-4 pb-2 text-sm text-gray-500 transition-all duration-100 ease-out ${
//                             isOpen
//                                 ? 'transform scale-100 opacity-100'
//                                 : 'transform scale-95 opacity-0 hidden'
//                         }`}
//                     >
//                         <div className="confidential-policy">
//                             <ConfidentialPolicy/>
//                         </div>
//
//                         {/* Agreement checkbox */}
//                         <div className="flex items-start mt-6">
//                             <div className="flex items-center h-5">
//                                 <input
//                                     id="agreement"
//                                     name="agreement"
//                                     type="checkbox"
//                                     checked={agreed}
//                                     onChange={handleCheckboxChange}
//                                     className="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
//                                 />
//                             </div>
//                             <label htmlFor="agreement" className="ml-3 text-sm text-gray-700">
//                                 Я согласен на обработку персональных данных в соответствии с
//                                 настоящей политикой согласно Федеральному закону от 27.07.2006 №
//                                 152-ФЗ «О персональных данных».
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Agreement
