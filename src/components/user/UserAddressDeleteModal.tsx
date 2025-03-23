'use client'
import React, {useEffect, useState} from 'react'
import {userAddressFormAction} from '@/actions/user/userAddressFormAction'
import {Description, Dialog} from '@headlessui/react'
import 'react-toastify/dist/ReactToastify.css'
import Success from '@/components/site/Success'
import Modal from '@/components/site/Modal'
import {deleteAddressRowAction, getAddressById} from "@/actions/addressActions";

//пользователь хочет удалить адрес

const UserAddressDeleteModal = ({id, setUpdatedAddressRows, isOpenModal, onClose}) => {
    //для показа сообщения пользователю об успехе отправки заказа перед закрытиекм модального окна 2 сек
    const [success, setSuccess] = useState<boolean>(false)
    // для показа удаляемого адреса перед удалением
    const [address, setAddress] = useState(null)
    // Состояние для отслеживания загрузки
    const [loading, setLoading] = useState(true)

    const fetchAddress = async (id: number) => {
        try {
            setLoading(true)
            const data = await getAddressById(id)
            console.error(' адреса:', data)
            setAddress(data)
        } catch (error) {
            console.error('Ошибка при получении адреса:', error)
        } finally {
            setLoading(false)
        }
    }

    // В useEffect
    useEffect(() => {
        if (id) {
            fetchAddress(id)
        }
    }, [id])

    // Функция для обработки формы удаления адреса
    const onSubmit = async (formData) => {
        // Получаем id из формы (можно также использовать id из пропсов)
        const id = formData.get('id')

        try {
            console.log('Удаление адреса с id:', id)
            // Вызываем server action для удаления адреса
            await deleteAddressRowAction(id)
            // Показываем сообщение об успехе
            setSuccess(true)
            // Закрываем модальное окно через 2 секунды
            setTimeout(() => {
                onClose()
            }, 2000)
        } catch (error) {
            console.error('Ошибка при удалении:', error)
        }
    }

    return (
        <Modal onClose={onClose} isOpenModal={isOpenModal}>
            <Dialog.Title className="text-2xl text-center font-bold mb-8 text-gray-700">
                Удаление адреса
            </Dialog.Title>

            {loading ? (
                <p className="text-center">Загрузка данных...</p>
            ) : (
                <form action={onSubmit} className="w-full">

                    {/* Скрытое поле для передачи id адреса */}
                    <input type="hidden" name="id" value={id} />

                    {success ? (
                        <Success props={'адрес удален'} />
                    ) : (
                        <>
                            <p className="text-center mb-6">
                                {address && (
                                    <Description className='mb-8 flex-col'>
                                        <h3 className='text-red-500 font-bold mb-4'>Вы действительно хотите удалить этот адрес?</h3>
                                        {`${address.city || ''} ${address.street || ''} ${address.home || ''} ${address.corps || ''} ${address.appart || ''} ${address.phone || ''}`}
                                    </Description>
                                )}
                            </p>

                            <div className="flex justify-center space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-2 rounded-md text-blue-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all"
                                >
                                    Отмена
                                </button>

                                <button
                                    type="submit"
                                    className="p-2 rounded-md text-red-500 border-2 border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition duration-200 relative after:absolute after:inset-0 after:rounded-md after:border-2 hover:after:border-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 after:transition-all"
                                >
                                    Удалить
                                </button>
                            </div>
                        </>
                    )}
                </form>
            )}
        </Modal>
    )
}

export default UserAddressDeleteModal

