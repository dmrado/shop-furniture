import {StockModel} from '@/db/models'
import {ProductModel} from '@/db/models'
import Product from '@/components/site/Product'
import FiltersCategories from '@/components/site/FiltersCategories'
import ReactPaginateWrapper from "@/components/site/ReactPaginateWrapper";

const ProductsPage = async ({searchParams }) => {
    console.log('searchParams', searchParams)
    const page = Number(searchParams?.page) || 1;
    const limit = 3
    const offset = (page - 1) * limit
    const productData = await ProductModel.findAndCountAll({
        // where: {
        //     quantity: {
        //         [Op.gte]: 1
        //     }
        // },
        limit,
        offset,
        include: [{
            model: StockModel,
            attributes: ['id', 'productId', 'quantity', 'inStock', 'lastUpdate'],
            as: 'stock'  // используем тот же алиас, что указали при определении связи
        }]
    })
    const totalPages = Math.ceil(productData.count / limit)

    if (!productData || !productData.rows.length) {
        return 'Данные не найдены и почему никто не звонит? '
    }

    const productList = productData.rows.map(product => ({
        id: product.id,
        articul: product.articul,
        name: product.name,
        description_1: product.description_1,
        description_2: product.description_2,
        old_price: product.old_price,
        new_price: product?.new_price,
        quantity: product.stock?.quantity,
        lastUpdate: product.stock?.lastUpdate,
        inStock: product.stock?.inStock,
        image: product?.image
    }))
    console.log('stockList', productList)

    return <>
        <div>
            <FiltersCategories/>
            <ReactPaginateWrapper pages={totalPages} currentPage={page}/>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {productList.map(product => (
                    <Product product={product} key={product.id} totalPages={totalPages}/>
                ))}
            </div>
        </div>
    </>
}

export default ProductsPage
