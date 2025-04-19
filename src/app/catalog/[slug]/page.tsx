import React from 'react'
import {getCategoryChildren, getCategoryId} from '@/actions/categoryActions'
import {getProducts} from '@/actions/productActions'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import ProductCard from '@/components/site/ProductCard'
import SideBar from '@/components/site/SideBar'
import {getTags} from '@/actions/tagActions'
import CategoryBar from '@/components/CategoryBar'

type Props = {
    params: { slug: string };
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>;
};

const CategoryPage = async ({params, searchParams}: Props) => {
    const categorySlug = params.slug
    console.log('>>>>>>>> >>>>> categorySlug from SlugPage', categorySlug)

    const { categoryId } = await getCategoryId(categorySlug)
    console.log('++++++++++++++++ subCategoryId from SlugPage', categoryId)

    const page = Number(searchParams?.page) || 1
    const limit = 16
    const offset = (page - 1) * limit

    //Запрос продуктов категории из params
    const { count, products } = await getProducts(categoryId, offset, limit)

    //Запрос дерева категорий
    const categoryChildren = await getCategoryChildren()
    console.log('************* categoryChildren from SlugPage', categoryChildren)

    const tags = await getTags()
    console.log('???????????? tags from SlugPage', tags)

    const totalPages = Math.ceil(count / limit)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Категория: {categorySlug}</h1>

            {/* Отображаем подкатегории, если они есть */}
            {categoryChildren && categoryChildren.length > 0 && (
                <div className="mb-8">
                    <CategoryBar categoryChildren={categoryChildren}/>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                {/* Боковая панель с фильтрами */}
                <div className="w-full md:w-1/4">
                    <SideBar tags={tags}/>
                </div>

                {/* Основной контент с товарами */}
                <div className="w-full md:w-3/4">
                    {products && products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product}/>
                                ))}
                            </div>

                            {/* Пагинация */}
                            {totalPages > 1 && (
                                <div className="mt-8">
                                    <ReactPaginateWrapper
                                        currentPage={page}
                                        totalPages={totalPages}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">Товары не найдены</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryPage
