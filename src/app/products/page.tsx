// import { StockModel } from '@/db/models'
import { ProductModel } from '@/db/models'
import ProductCard from '@/components/site/ProductCard'
import FiltersCategories from '@/components/site/FiltersCategories'
import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'

type Props = {
    searchParams: Record<'page'|'itemsPerPage', string | string[] | undefined>
}

const ProductsPage = async ({ searchParams }: Props) => {
    const page = Number(searchParams?.page) || 1
    const limit = 2
    const offset = (page - 1) * limit
    const productData = await ProductModel.findAndCountAll({
        limit,
        offset,
        where: { isActive: true },
        attributes: [ 'id', 'name', 'description_1', 'old_price', 'new_price', 'image', 'isNew' ],
        // include: [{
        //     model: StockModel,
        //     attributes: [ 'id', 'productId', 'quantity', 'inStock', 'lastUpdate' ],
        //     as: 'stock', // используем тот же алиас, что указали при определении связи
        // }]
    })

    const totalPages = Math.ceil(productData.count / limit)

    if (!productData || !productData.rows.length) {
        return 'Данные не найдены и почему никто не звонит? '
    }

    const productList = productData.rows.map(product => ({
        id: product.id,
        name: product.name,
        description_1: product.description_1,
        old_price: product.old_price,
        new_price: product.new_price,
        image: product.image,
        category: '-- Категория по умочанию -- ', // TODO: create category model
        isNew: product.isNew,
        // quantity: product.stock?.quantity,
        // lastUpdate: product.stock?.lastUpdate ?? new Date(),
        // inStock: product.stock?.inStock ?? false,
    }))

    return <>
        <div>
            <FiltersCategories/>
            <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {productList.map(product => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    </>
}

export default ProductsPage
