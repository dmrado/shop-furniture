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
    console.log('queryParams', queryParams)
    const router = useRouter()
    const path = usePathname()
    const queryValue: string | null = queryParams.get(queryKey)
    console.log('queryValue', queryValue, typeof queryValue)

    const selectedValue =
        options.find((option) => option.value === queryValue) ?? null
    console.log('selectedValue', selectedValue)

    const updateUrlParam = (option: Option | null) => {
        console.log('option in updateUrlParam он же объект selectedOption из select Select-a', option)
        // const searchParams = new URLSearchParams(queryParams.toString()) queryParams (результат useSearchParams()) всегда является объектом URLSearchParams, даже если в URL нет параметров. Он никогда не бывает null или undefined. Поэтому проверка queryParams ? ... : ... лишняя. Можно просто и безопасно использовать new URLSearchParams(queryParams.toString()) или, что ещё лучше, new URLSearchParams(queryParams).
        const searchParams = queryParams
            ? new URLSearchParams(queryParams.toString())
            : new URLSearchParams()
        if (option) {
            searchParams.set(queryKey, option.value)
            console.log('грубо brand = value', `brang ${queryKey} with value${option.value} полетело в  router.push`)
        } else {
            searchParams.delete(queryKey)
        }
        searchParams.delete('page')
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
