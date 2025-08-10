'use client'
import React, { useId } from 'react'
// import { v4 as uuidv4 } from 'uuid' // вызывает проблему гидрации из-за несовпадения динамически генерируемых идентификаторов

export type Option = {
    value: string
    label: string
}

type Props = {
    label: string
    value: Option | null
    options: Option[]
    handleChange: (value: Option | null) => void
    placeHolder: string
}

const Select = ({
    value,
    options,
    handleChange,
    placeHolder,
    label = ''
}: Props) => {
    // const selectId = uuidv4()
    const selectId = useId()
    return (
        <div>
            <label
                htmlFor={selectId}
                className="block text-gray-700 text-sm font-bold my-2"
            >
                {label}
            </label>
            <select
                id={selectId}
                value={value?.value ?? ''}
                onChange={(e) => {
                    if (e.target.value === '') {
                        handleChange(null)
                        return
                    }
                    const selectedOption = options.find((option) => option.value === e.target.value)

                    if (!selectedOption)
                        throw new Error('Selected option can not be find')
                    handleChange(selectedOption)
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
                <option value="">{placeHolder}</option>
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select
