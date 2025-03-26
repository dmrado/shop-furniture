// import { StockModel } from '@/db/models'
import {ProductModel} from '@/db/models'
import ProductCard from '@/components/site/ProductCard'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import {getProducts} from '@/actions/productActions'
import CatalogSection from '@/components/site/CatalogSection'

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const ProductsPage = async ({searchParams}: Props) => {
    const page = Number(searchParams?.page) || 1
    const limit = 5
    const offset = (page - 1) * limit

    const {count, products} = await getProducts(offset, limit)

    const totalPages = Math.ceil(count / limit)


    return <>
        <div>
            <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.length
                    ? products.map(product => (
                        <ProductCard product={product} key={product.id}/>))
                    : <p>Продукты не найдены? </p>
                }
            </div>
        </div>
    </>
}

export default ProductsPage
