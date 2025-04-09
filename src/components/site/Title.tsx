import React from 'react'
import { getSubCategoryName } from '@/actions/categoryActions'

const Title = async ({ params }) => {
    const subCategorySlug = params.slug
    const { subCategoryName: name } = await getSubCategoryName(subCategorySlug)

    return <>
        <h1 className="text-3xl font-medium text-center mb-8">{name}</h1>
    </>
}
export default Title