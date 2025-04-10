import React from 'react'
import { getCategoryChildren, getCategoryId } from '@/actions/categoryActions'
import { getProducts } from '@/actions/productActions'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import ProductCard from '@/components/site/ProductCard'
import CategoryScroll from '@/components/site/CategoryScroll'

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

    if (products.length && children.length) {
        throw new Error('No mixed categories!!!')
    }

    const totalPages = Math.ceil(count / limit)
    console.log('new products from [slug] page', products)

    return (
        <>
            <CategoryScroll categories={children}/>
            <div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.length ? (
                        products.map((product) => (
                            <ProductCard
                                product={product}
                                key={product.id}
                                subCategorySlug={categorySlug}
                            />
                        ))
                    ) : (
                        <p>Продукты не найдены? </p>
                    )}
                </div>
                <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
            </div>
        </>
    )
}
export default CategoryPage
