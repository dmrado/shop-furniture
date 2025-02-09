'use client'
import React, {FormEvent, useState} from 'react'
import {nodeMailerInstantOrder} from '@/actions/NodeMailerInstantOrder'
import Success from '@/components/site/Success'
import Agreement from '@/components/site/Agreement'
import {createInstantUserAction} from "@/actions/userActions";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handleOrderToDB} from "@/actions/user/handleOrderToDB";
import UserAddressForm from "@/components/user/UserAddressForm";


//todo пользователь хочет оформить заказ, но адреса нет в списке, для добавления нового адреса открываем модальное окно и сохраняем адрес в БД и добавляем в заказ
export const NewAddressModal = ({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) => {
    // fixme ???

    // // для показа сообщения пользователю об успехе отправки заказа перед закрытиекм модального окна 2 сек
    const [success, setSuccess] = useState<boolean>(false)

    // обработчик основной формы сохранения новго адреса
    //+++++++++++++++++++start validation++++++++++++++++++++++++


    class ValidationError extends Error {
        constructor(message: string) {
            super(message);
            this.name = 'ValidationError';
        }
    }

    //+++++++++++++++++++finish validation+++++++++++++++++++++

    // // =========== Слить с обработчиком onSubmit =====================
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //
    //     const form = e.target
    //     if (!form) return
    //     const formData = new FormData(form)
    //
    //     const {name, phone} = cleanInstantFormData(formData)
    //
    //     setIsClosing(true)
    //
    //     if (!captchaToken) {
    //         alert('Пожалуйста, подтвердите, что вы не робот')
    //         return
    //     }
    //     if (!agreed) {
    //         alert('Необходимо согласие на обработку персональных данных')
    //         return
    //     }
    //
    //     // параллельная отправка почты и сохранения в БД
    //     try {
    //         const [mailSuccess, dbResult] = await Promise.all([
    //             nodeMailerInstantOrder({name, phone}),
    //             createInstantUserAction({name, phone})
    //         ]);
    //         if (mailSuccess) {
    //             setSuccess(true);
    //             alert('Заявка успешно отправлена, ожидайте звонка для оформления заказа!');
    //             // todo не чистится форма
    //             setName('')
    //             setPhone('')
    //             // setCaptchaToken('');
    //         } else {
    //             alert('Возникла проблема при отправке заявки. Пожалуйста, попробуйте позже.');
    //         }
    //     } catch (error) {
    //         console.error('Ошибка:', error);
    //         alert('Произошла ошибка при обработке заявки. Пожалуйста, попробуйте позже.');
    //     }
    //     // =========================================
    //     setIsClosing(false)
    // }

    if (!isOpen) return null

    return <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl">
                <div className="p-8">
                    <h2 className="text-xl font-bold mb-2 text-gray-700">
                        Добавление нового адреса
                    </h2>
                    <UserAddressForm onClose={onClose}/>
                </div>
            </div>
        </div>
    </>
}
