import React from 'react'
import {getCategoryChildren, getCategoryId} from '@/actions/categoryActions'
import {getProducts} from '@/actions/productActions'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import ProductCard from '@/components/site/ProductCard'
import CategoryScroll from '@/components/site/CategoryScroll'
import SideBar from '@/components/site/SideBar'
import {getTags} from '@/actions/tagActions'
import CategoryBar from "@/components/CategoryBar";

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>;
};

const CategoryPage = async ({params, searchParams}: Props) => {
    const categorySlug = params.slug
    console.log('>>>>>>>> >>>>> categorySlug from SlugPage', categorySlug)

    const {categoryId} = await getCategoryId(categorySlug)
    console.log('++++++++++++++++ subCategoryId from SlugPage', categoryId)

    const page = Number(searchParams?.page) || 1
    const limit = 16
    const offset = (page - 1) * limit

    const {count, products} = await getProducts(categoryId, offset, limit)

    const categoryChildren = await getCategoryChildren(categoryId)
    console.log('************* categoryChildren from SlugPage', categoryChildren)

    const tags = await getTags()
    console.log('???????????? tags from SlugPage', tags)

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

    const totalPages = Math.ceil(count / limit)
    console.log('new products from [slug] page', products)

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">

                    <div className="lg:col-span-2">
                        {products.length > 0 && (
                            <div className="mb-5">
                                <SideBar tags={tags}/>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-8 mx-4">

                        <div className="mb-4">
                            {categoryChildren.length > 0 && (
                                <CategoryBar categoryChildren={categoryChildren}/>
                            )}
                        </div>


                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard
                                            product={product}
                                            key={product.id}
                                            categorySlug={categorySlug}
                                        />
                                    ))
                                ) : (
                                    <p className="col-span-full text-center py-4">Продукты не найдены</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Пагинация для продуктов*/}
                <div className="mt-6">
                    <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
                </div>
            </div>
        </>
    )

}
export default CategoryPage
