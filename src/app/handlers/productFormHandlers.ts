'use client'
import { DictionaryItem, ModalState } from '@/db/types/common-types'
import { Dispatch, SetStateAction } from 'react'

type SetModalState = Dispatch<SetStateAction<ModalState>>

// Универсальный обработчик для добавления
export const addHandler = (
    type: ModalState['type'],
    setModalState: SetModalState
) => {
    setModalState({ isOpen: true, type: type, initialData: null })
}

// Универсальный обработчик для редактирования
export const editHandler = async (
    id: number | string,
    type: ModalState['type'],
    setModalState: SetModalState,
    fetchFunction: (id: number) => Promise<DictionaryItem | null>
) => {
    if (typeof id === 'number' && id > 0) {
        try {
            const initialData = await fetchFunction(id)
            if (initialData) {
                setModalState({
                    isOpen: true,
                    type: type,
                    initialData: initialData
                })
            } else {
                alert(`${type} не найден.`)
            }
        } catch (error) {
            alert(`Ошибка при загрузке данных ${type}.`)
            console.error(error)
        }
    } else {
        alert(`Пожалуйста, выберите ${type} для редактирования.`)
    }
}
