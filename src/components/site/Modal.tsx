import { Description, Dialog } from '@headlessui/react'
import React, { Fragment } from 'react'

interface ModalProps {
    isOpenModal: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({ isOpenModal, onClose, children, title, description }: ModalProps) {

    return <>
        <Dialog as="div"
            transition
            className="fixed z-50 inset-0 flex w-screen items-center justify-center bg-black/75 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
            open={isOpenModal} onClose={onClose}>
            <Dialog.Panel className="w-full max-w-4xl transform rounded-xl bg-white p-16 md:p-8 shadow-2xl transition-all">
                <Dialog.Title className="text-2xl text-center font-bold mb-8 text-gray-700">
                    {title}
                </Dialog.Title>
                <Description className='mb-8'>{description}</Description>
                <div className="flex min-h-full items-center justify-center p-4">

                    {children}

                </div>
            </Dialog.Panel>
        </Dialog>
    </>
}
