'use client'
import React, { useState, useRef, useEffect } from 'react'

/*кастомный компоненет, который имитирует поведение <select>, но с полной управляемостью через CSS для достижения желаемого эффекта (выпадающий список, который при открытии имеет ограниченную высоту и прокрутку),*/

interface SelectWithOptionsProps {
    options: { label: string; value: string }[]
    placeholder: string
    value: string
    onChange: (value: string) => void
}

const SelectWithOptions = ({ options, placeholder, value, onChange }: SelectWithOptionsProps) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    // Закрываем список при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ selectRef ])

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue)
        setIsOpen(false)
    }

    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder

    return (
        <div className="relative w-full sm:w-auto" ref={selectRef}>
            <button
                type="button"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedLabel}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    <div
                        className="cursor-pointer py-2 px-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => handleOptionClick('')}
                    >
                        {placeholder}
                    </div>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="cursor-pointer py-2 px-3 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectWithOptions