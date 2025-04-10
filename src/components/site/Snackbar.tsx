import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

interface SnackbarProps {
    message: string;
    backgroundColor?: 'black' | 'white' | string;
    duration?: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function Snackbar({
                                     message,
                                     backgroundColor = 'black',
                                     duration = 3000,
                                     isOpen,
                                     onClose
                                 }: SnackbarProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    // Определяем цвета в зависимости от backgroundColor
    const bgClass = backgroundColor === 'white'
        ? 'bg-white text-gray-900 shadow-lg'
        : backgroundColor === 'black'
            ? 'bg-gray-900 text-white'
            : `${backgroundColor} text-white`

    return (
        <Transition
            show={isOpen}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
                <div className={`${bgClass} rounded-md px-4 py-3 shadow-md max-w-sm mx-auto pointer-events-auto`}>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message}</p>
                        <button
                            type="button"
                            className="ml-4 flex-shrink-0 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                            onClick={onClose}
                        >
                            <span className="sr-only">Закрыть</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
