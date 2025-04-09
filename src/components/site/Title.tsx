import React from 'react'
import { getSubCategoryName } from '@/actions/categoryActions'

const Title = async ({ params }) => {
    console.log('=========== params from Title', params)

    const subCategorySlug = params.slug

    const { subCategoryName: name } = await getSubCategoryName(subCategorySlug)

    // const { subCategoryName } = await getSubCategoryId(params.name)
    console.log('=========== subCategory name from Title', name)

    return <>
        {/* Заголовок страницы */}
        <h1 className="text-3xl font-medium text-center mb-8">{name}</h1>
    </>
}

export default Title