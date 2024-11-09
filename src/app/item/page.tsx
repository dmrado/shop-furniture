import {StockModel} from '@/db/models/stock.model'
import {Stock} from '@/db/types/interfaces'
import {ItemModel} from "@/db/models/item.model"
import ItemList from "@/components/admin/ItemList"
import {Op} from "sequelize"
import {number} from "prop-types";


const ItemPage = async () => {

    const stockData = await StockModel.findAndCountAll({
        // where: {
        //     quantity: {
        //         [Op.gte]: 1
        //     }
        // },
        // limit: 10,
        // offset: 0,
        include: [{
            model: ItemModel,
            attributes: ['id', 'articul', 'name', 'description_1', 'description_2', 'old_price', 'new_price'],
            as: 'items'  // используем тот же алиас, что указали при определении связи
        }]
    })
    console.log('SEQUELIZE INSTANCE OF stockData', stockData)

    if (!stockData || !stockData.rows.length) {
        return 'Данные не найдены и почему никто не звонит? '
    }

    const stockList = stockData.rows.map(stock => ({
            id: stock.itemId,
            quantity: stock.quantity,
            lastUpdate: stock.lastUpdate,
            inStock: stock.inStock,
            items: stock.items.map(item => ({
                id: stock.itemId,
                articul: item.articul,
                name: item.name,
                description_1: item.description_1,
                description_2: item.description_2,
                old_price: item.old_price,
                new_price: item.new_price,
            }))
        }))
    console.log('stockList', stockList)
    return (
        <div>
            <ItemList items={stockList}/>
        </div>
    )
}

export default ItemPage