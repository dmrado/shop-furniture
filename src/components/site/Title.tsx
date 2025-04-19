import React from 'react'
// import { getSubCategoryName } from '@/actions/categoryActions'

const Title = async ({ title }) => {
    // const subCategorySlug = params.slug
    // const { subCategoryName: name } = await getSubCategoryName(subCategorySlug)

    return <>
        <h1 className="text-3xl text-[#383838] font-medium text-center mb-8">{title}</h1>
    </>
}
export default Title