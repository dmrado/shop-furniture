'use client'
import React from 'react'
import { Option } from '@/components/ui/Select'
import Select from '@/components/ui/Select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
    options: Option[]
    label: string
    queryKey: string
    // queryDefaultValue: string
    placeHolder: string
}

const UrlParamsSelect = ({ options, label, queryKey, placeHolder }: Props) => {
    console.log('options', options)
    const queryParams = useSearchParams()
    const router = useRouter()
    const path = usePathname()

    const queryValue: string | null = queryParams.get(queryKey)
    console.log('queryValue', queryValue, typeof queryValue)

    const selectedValue =
        options.find((option) => option.value === queryValue) ?? null
    console.log('selectedValue', selectedValue)
    const updateUrlParam = (option) => {
        const searchParams = queryParams
            ? new URLSearchParams(queryParams.toString())
            : new URLSearchParams()
        if (option) {
            searchParams.set(queryKey, option.value)
        } else {
            searchParams.delete(queryKey)
        }
        router.push(path + '?' + searchParams.toString())
    }

    return (
        <Select
            options={options}
            label={label}
            value={selectedValue}
            handleChange={updateUrlParam}
            placeHolder={placeHolder}
        />
    )
}

export default UrlParamsSelect
