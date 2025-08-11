'use client'
import React, { useEffect, useState } from 'react'
import { userAddressFormAction } from '@/actions/user/userAddressFormAction'
import { Description, Dialog } from '@headlessui/react'
import 'react-toastify/dist/ReactToastify.css'
import Success from '@/components/site/Success'
import Modal from '@/components/site/Modal'
import { deleteAddressRowAction, getAddressByIdAction, getAddressListAction } from '@/actions/addressActions'

//пользователь хочет удалить адрес

const UserAddressDeleteModal = ({ id, setAddressList, isOpenModal, onClose }) => {

    const [ status, setStatus ] = useState('idle') // 'idle', 'loading', 'success', 'error'
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ address, setAddress ] = useState(null)

    const fetchAddress = async (id: number) => {
        try {
            setStatus('loading')
            const data = await getAddressByIdAction(id)
            setAddress(data)
            setStatus('idle')
        } catch (error) {
            console.error('Ошибка при получении адреса:', error)
            setStatus('error')
            setErrorMessage('Не удалось загрузить данные адреса')
        }
    }
    useEffect(() => {
        if (id) {
            fetchAddress(id)
        }
    }, [ id ])

    // Функция для обработки формы удаления адреса
    const onSubmit = async (formData) => {

        const addressId = formData.get('id')

        try {
            setStatus('loading')
            await deleteAddressRowAction(addressId)
            setAddressList(prevList => prevList.filter(address => address.id !== addressId))
            setStatus('success')
            setTimeout(() => {
                onClose()
                setStatus('idle')
            }, 2000)
        } catch (error) {
            console.error('Ошибка при удалении:', error)
            setStatus('error')
            setErrorMessage(error.message || 'Не удалось удалить адрес. Пожалуйста, попробуйте позже.')
        }
    }

    return (
        <Modal onClose={onClose} isOpenModal={isOpenModal}>
            <Dialog.Title className="text-2xl text-center font-bold mb-8 text-gray-700">
                Удаление адреса
            </Dialog.Title>

            {status === 'loading' && (
                <div className="text-center py-4">
                    <div className="spinner"></div>
                    <p>Загрузка...</p>
                </div>
            )}

            {status === 'success' && (
                <div className="text-center mb-6 py-4 text-green-600">
                    <Success props={'Адрес удален'}/>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center py-4 text-red-600">
                    <p>{errorMessage}</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-2 px-4 py-2 bg-gray-200 rounded"
                    >Попробовать снова
                    </button>
                </div>
            )}

            {status === 'idle' && (
                <form action={onSubmit} className="w-full">

                    {/* Скрытое поле для передачи id адреса */}
                    <input type="hidden" name="id" value={id}/>

                    {address && (
                        <Description className='text-center mb-4 flex-col'>
                            <span className="mr-2 text-5xl mb-4 inline-block">⚠️</span>
                            <h3 className='text-red-500 font-bold mb-2'>

                                Вы действительно хотите удалить этот адрес?
                            </h3>

                            <p> {address.city || ''} {address.street || ''} {address.home || ''} {address.corps || ''} {address.appart || ''} </p>
                            <p> {address.phone || ''}</p>
                        </Description>
                    )}

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
                </form>
            )}
        </Modal>
    )
}

export default UserAddressDeleteModal
