// import { StockModel } from '@/db/models'
import {ProductModel} from '@/db/models'
import ProductCard from '@/components/site/ProductCard'
import FiltersCategories from '@/components/site/FiltersCategories'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import {getProducts} from "@/actions/productActions";
import CatalogSection from "@/components/site/CatalogSection";
// todo эта страница перенесена в /divani/page
// todo здесь должна быть вторая страница макета из фигмы "Каталог элитной мебели и декора" на ней отдельный блок для каждой категории друг под другом
type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const ProductsPage = async ({searchParams}: Props) => {
    const page = Number(searchParams?.page) || 1
    const limit = 3
    const offset = (page - 1) * limit

    const {count, products} = await getProducts(offset, limit)

    const totalPages = Math.ceil(count / limit)


    return <>
        <div>
            {/*<FiltersCategories/>*/}
            {/*<ReactPaginateWrapper pages={totalPages} currentPage={page}/>*/}
            <h1 className="p-4 text-4xl">здесь должна быть вторая страница макета из фигмы "Каталог элитной мебели и декора" на ней отдельный блок для каждой категории друг под другом, а, возможно, воспользоваться: CLICK ME->
                <a href="https://nextjs.org/docs/app/building-your-application/routing/parallel-routes"> <span className="p-4 font-extrabold">Параллельными маршрутами </span></a> </h1>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/*{products.length*/}
                {/*    ? products.map(product => (*/}
                {/*        <ProductCard product={product} key={product.id}/>))*/}
                {/*    : <p>Продукты не найдены? </p>*/}
                {/*}*/}
            </div>
</div>
    </>
}

export default ProductsPage
