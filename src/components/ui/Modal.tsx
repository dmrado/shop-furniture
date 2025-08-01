import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline' // Предполагаем, что у вас есть heroicons

type ModalProps = {
    onClose: () => void
    children: React.ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 relative max-w-lg w-full">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Закрыть"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal