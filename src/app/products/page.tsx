import {StockModel} from '@/db/models/stock.model'
import {Stock} from '@/db/types/interfaces'
import {ProductModel} from "@/db/models/product.model"
import ItemList from "@/components/admin/ItemList"
import {Op} from "sequelize"
import {number} from "prop-types";


const ProductsPage = async () => {

    const productData = await ProductModel.findAndCountAll({
        // where: {
        //     quantity: {
        //         [Op.gte]: 1
        //     }
        // },
        // limit: 10,
        // offset: 0,
        include: [{
            model: StockModel,
            attributes: ['id', 'productId', 'quantity', 'inStock', 'lastUpdate'],
            as: 'stock'  // используем тот же алиас, что указали при определении связи
        }]
    })

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
        new_price: product.new_price,
        quantity: product.stock.quantity,
        lastUpdate: product.stock.lastUpdate,
        inStock: product.stock.inStock,
        }))
    console.log('stockList', productList)
    return (
        <div>
            <ItemList products={productList}/>
        </div>
    )
}

export default ProductsPage