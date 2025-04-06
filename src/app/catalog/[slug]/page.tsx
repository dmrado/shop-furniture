import React from 'react'
import {getFullCategoryTree, getSubCategoryId} from "@/actions/categoryActions";
import {getProducts} from "@/actions/productActions";
import InfinityScroll from "@/components/site/InfinityScroll";
import ReactPaginateWrapper from "@/components/site/ReactPaginateWrapper";
import ProductCard from "@/components/site/ProductCard";

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}
//todo мне нужен универсальный инфинитискролл или оставить пагинацию...
const SlugPage = async ({params, searchParams}: Props) => {

    const subCategorySlug = params.slug
    console.log('>>>>>>>> >>>>> subCategorySlug from SlugPage', subCategorySlug)

    const {subCategoryId} = await getSubCategoryId(subCategorySlug)
    console.log('++++++++++++++++ subCategoryId from SlugPage', subCategoryId)

    const page = Number(searchParams?.page) || 1
    const limit = 16
    const offset = (page - 1) * limit

    const {count, products} = await getProducts(subCategoryId, offset, limit)

    const totalPages = Math.ceil(count / limit)
    console.log('new products from [slug] page', products);

    return <>
        <div className='flex justify-center text-4xl text-red-700 font-extrabold'>
            Catalog slug:  &nbsp;<span className="text-green-600">{params.slug}</span>
        </div>
        {/*<InfinityScroll initialItems={products}/>*/}
        <div>
            <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.length
                    ? products.map(product => (
                        <ProductCard
                            product={product}
                            key={product.id}
                            subCategorySlug={subCategorySlug}
                        />))
                    : <p>Продукты не найдены? </p>
                }
            </div>
        </div>
    </>
}
export default SlugPage