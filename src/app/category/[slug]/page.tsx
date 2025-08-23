import React from 'react'
import {
    getCategory,
    getCategoryChildren,
    getCategoryParents,
    getChildrenIds
} from '@/actions/categoryActions'
import { getProducts } from '@/actions/productActions'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import ProductCard from '@/components/site/ProductCard'
import SideBar from '@/components/site/SideBar'
import CategoryBar from '@/components/CategoryBar'
import { notFound } from 'next/navigation'
import Title from '@/components/site/Title'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import AdminFilter from '@/components/site/navigation/AdminFilter'
import {
    BrandModel,
    CollectionModel,
    CountryModel,
    StyleModel
} from '@/db/models'
import { DictionaryItem } from '@/db/types/common-types'
import {
    getBrands,
    getActiveCollections,
    getActiveCountries,
    getActiveStyles
} from '@/actions/dictionaryActions'

type Props = {
    params: { slug: string }
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const CategoryPage = async ({ params, searchParams }: Props) => {
    const categorySlug = params.slug
    console.log('>>>>>>>> >>>>> categorySlug from SlugPage', categorySlug)

    const category = await getCategory(categorySlug)
    if (!category) {
        return notFound()
    }

    console.log('++++++++++++++++ categoryId from SlugPage', category.id)

    const page = Number(searchParams?.page) || 1
    const limit = 12
    const offset = (page - 1) * limit

    const categoryParents = await getCategoryParents(category.id)

    console.log('categoryParents', categoryParents)

    //Запрос дерева категорий
    const categoryChildren = await getCategoryChildren(category.id)
    console.log(
        '************* categoryChildren from SlugPage',
        categoryChildren
    )

    //Запрос продуктов категории из params

    const flatChilrenIds = await getChildrenIds(categoryChildren)
    console.log('flatChilrenIds', flatChilrenIds)

    const { count, products } = await getProducts(
        [category.id, ...flatChilrenIds],
        offset,
        limit
    )

    // const tags = await getTags()
    // console.log('???????????? tags from SlugPage', tags)

    const totalPages = Math.ceil(count / limit)

    const brands = await getBrands()
    const collections = await getActiveCollections()
    const countries = await getActiveCountries()
    const styles = await getActiveStyles()

    return (
        <div className="container mx-auto px-4 py-8">
            <Title title={category.name} />

            {/*h2 category.service-instructions*/}
            {/*h3 category.description*/}
            <Breadcrumbs
                items={[
                    {
                        label: 'Главная',
                        href: '/'
                    },
                    {
                        label: 'Каталог',
                        href: '/category'
                    },
                    ...categoryParents.map((category) => ({
                        label: category.name,
                        href: `/category/${category.slug}`
                    }))
                ]}
            />

            <h1 className="text-2xl font-bold mb-6">
                Категория: {categorySlug}
            </h1>

            {/* Отображаем подкатегории, если они есть */}
            {categoryChildren && categoryChildren.length > 0 && (
                <div className="mb-8">
                    <CategoryBar categoryChildren={categoryChildren} />
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                {/* Боковая панель с фильтрами */}
                <div className="w-full md:w-1/4">
                    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-2">
                        <h3 className="text-lg font-bold mb-2">
                            Фильтр продуктов
                        </h3>
                        <AdminFilter
                            brands={brands}
                            collections={collections}
                            countries={countries}
                            styles={styles}
                        />
                    </div>
                </div>
                {/* Основной контент с товарами */}
                <div className="w-full md:w-3/4">
                    {products && products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>

                            {/* Пагинация */}
                            {totalPages > 1 && (
                                <div className="mt-8">
                                    <ReactPaginateWrapper
                                        currentPage={page}
                                        pages={totalPages}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">
                                Товары не найдены
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryPage
