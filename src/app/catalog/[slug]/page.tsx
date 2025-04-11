import React from 'react'
import { getCategoryChildren, getCategoryId } from '@/actions/categoryActions'
import { getProducts } from '@/actions/productActions'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import ProductCard from '@/components/site/ProductCard'
import CategoryScroll from '@/components/site/CategoryScroll'
import SideBar from '@/components/site/SideBar'

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>;
};
//todo мне нужен универсальный инфинитискролл или оставить пагинацию...
const CategoryPage = async ({ params, searchParams }: Props) => {
    const categorySlug = params.slug
    console.log('>>>>>>>> >>>>> categorySlug from SlugPage', categorySlug)

    const { categoryId } = await getCategoryId(categorySlug)
    console.log('++++++++++++++++ subCategoryId from SlugPage', categoryId)

    const page = Number(searchParams?.page) || 1
    const limit = 16
    const offset = (page - 1) * limit

    const { count, products } = await getProducts(categoryId, offset, limit)

    const children = await getCategoryChildren(categoryId)

    // if (products.length && children.length) {
    //     throw new Error('No mixed categories!!!')
    // }

    // fixme: pseudocode
    // if (products.length) {
    //     return <FinalCategory />
    // }
    //
    // if (children.length) {
    //     return <Subcategory/>
    // }

    const rootCategories = await getCategoryChildren(null)

    const totalPages = Math.ceil(count / limit)
    console.log('new products from [slug] page', products)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* Боковое меню - 1/5 на больших экранах */}
                {products.length &&
                    <div className="md:col-span-1">
                        <SideBar allCategories={rootCategories}/>
                    </div>
                }

                <div className="md:col-span-2 lg:col-span-4">
                    <CategoryScroll categories={children}/>
                    <div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {products.length ? (
                                products.map((product) => (
                                    <ProductCard
                                        product={product}
                                        key={product.id}
                                        categorySlug={categorySlug}
                                    />
                                ))
                            ) : (
                                <p>Продукты не найдены? </p>
                            )}
                        </div>
                        <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
                    </div>
                </div>

            </div>

        </>
    )
}
export default CategoryPage
