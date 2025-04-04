import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import {getProducts} from '@/actions/productActions'
import ProductCategory from '@/components/site/ProductCategory'
import React from 'react'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import InfinityScroll from '@/components/site/InfinityScroll'
import {getCategories, getMainCategories} from '@/actions/categoryActions'

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const CatalogPage = async ({searchParams}: Props) => {
    const page = Number(searchParams?.page) || 1

    const limitMainCategories = 10
    const offsetMainCategories = (page - 1) * limitMainCategories

    const {countMainCategories, mainCategories} = await getMainCategories(offsetMainCategories, limitMainCategories)
    console.log('mainCategories from catalog page', mainCategories)
    console.log('countMainCategories', countMainCategories)


    const limit = 1000
    const offset = (page - 1) * limit

    const {count, categories} = await getCategories(offset)
    console.log('categories from catalog page', categories)
    console.log('count', count)

    const totalPages = Math.ceil(count / limit)

    return <>
        <div className="p-4">
            <Breadcrumbs/>
        </div>
        <div className="flex px-4 text-center justify-center text-3xl font-medium items-center mt-16">
            <h1>Каталог элитной мебели и декора</h1>
        </div>

        {!!mainCategories && mainCategories.map(mainCategory =>
            <li key={mainCategory.id}>

                <div className="container mx-auto my-8">
                    <div className="flex p-4 flex-row items-center mb-6">
                        <div className="text-3xl font-medium">
                            <h1>{mainCategory.name}</h1>
                            {/*<h1>{grandCategory.name}</h1>*/}
                        </div>
                    </div>
                    <InfinityScroll initialItems={categories}/>
                </div>

            </li>)}
    </>
}
export default CatalogPage