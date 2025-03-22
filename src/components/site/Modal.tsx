import { Dialog } from '@headlessui/react'
import { Fragment } from 'react'

interface ModalProps {
    isOpenModal: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({ isOpenModal, onClose, children }: ModalProps) {

    return <>
        <Dialog as="div"
            transition
            className="fixed inset-0 flex w-screen items-center justify-center bg-black/75 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
            open={isOpenModal} onClose={onClose}>

            <div className="flex min-h-full items-center justify-center p-4">
                <Dialog.Panel
                    className="w-full max-w-4xl transform rounded-xl bg-white p-8 shadow-2xl transition-all">
                    {children}
                </Dialog.Panel>
            </div>

        </Dialog>
    </>
}
