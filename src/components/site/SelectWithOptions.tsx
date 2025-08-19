'use client'
//кастомный компонент, который имитирует поведение <select>, но с полной управляемостью через CSS для достижения желаемого эффекта (выпадающий список, который при открытии имеет ограниченную высоту и прокрутку)

import React, { useState, useRef, useEffect } from 'react'

interface SelectWithOptionsProps {
    options: { label: string; value: string }[]
    placeholder: string
    value: string
    onChange: (value: string) => void
}

const SelectWithOptions = ({
    options,
    placeholder,
    value,
    onChange
}: SelectWithOptionsProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('') // <-- Новое состояние для поиска
    const selectRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Закрываем список при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Проверяем, что selectRef.current существует
            const currentRef = selectRef.current
            if (currentRef && !currentRef.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchTerm('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [selectRef])

    // Открываем список и фокусируемся на поле поиска
    const toggleOpen = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            // Если открываем, даем компоненту немного времени,
            // чтобы появиться в DOM, а потом фокусируем поле
            setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
        }
    }

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue)
        setIsOpen(false)
        setSearchTerm('') // Очищаем поиск после выбора
    }

    // Фильтруем опции на основе поискового запроса
    const filteredOptions = options.filter((option) =>
        option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder

    return (
        <div className="relative w-full sm:w-auto" ref={selectRef}>
            <button
                type="button"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-left"
                onClick={toggleOpen}
            >
                {selectedLabel}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    <div className="p-2">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Поиск..."
                            className="w-full border px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#f59e0b]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие списка при клике на поле. onClick для input: e.stopPropagation() предотвращает "всплытие" события клика, которое могло бы закрыть список из-за handleClickOutside
                        />
                    </div>
                    <div
                        className="cursor-pointer py-2 px-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => handleOptionClick('')}
                    >
                        {placeholder}
                    </div>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className="cursor-pointer py-2 px-3 text-gray-700 hover:bg-gray-100"
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-gray-500 text-sm">Ничего не найдено</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SelectWithOptions
