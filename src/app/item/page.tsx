import {StockModel} from '@/db/models/stock.model'
import {Stock} from '@/db/types/interfaces'
import {ItemModel} from "@/db/models/item.model"
import ItemList from "@/components/admin/ItemList";


const ItemPage = async () => {

    const stockData = await StockModel.findOne({
        where: {
            itemId: 1
        },
        // Дополнительные опции
        // raw: true, // Получить простой объект вместо экземпляра модели
        // nest: true, // Вложенные объекты в виде JSON
        // Выбор конкретных полей
        // attributes: ['id', 'email', 'name', 'surName'],
        // Если нужны связанные данные
        include: [{
            model: ItemModel,
            attributes: ['id', 'articul', 'name', 'description_1', 'description_2'],
            as: 'items'  // используем тот же алиас, что указали при определении связи
        }]
    })
console.log('SEQUELIZE INSTANCE OF STOCK', stockData)
    if(!stockData) {
        return 'Почему никто не звонит?'
    }
//todo почему то не видит типов из импортированного интерфейса Stock
    const stockList: {
        itemId: number;
        quantity: number;
        lastUpdate: undefined;
        inStock: boolean;
        id: number;
        items: { name: string; description_1: string; id: number; description_2: string; articul: string }[]
    } = {
        id: stockData.itemId,
        quantity: stockData.quantity,
        items: stockData.items.map(item => ({
            id: stockData.itemId,
            articul: item.articul,
            name: item.name,
            description_1: item.description_1,
            description_2: item.description_2
        })), inStock: false, itemId: 0, lastUpdate: undefined
    }

    return (
        <div>
            <ItemList stock={stockList}/>
        </div>
    );
};

export default ItemPage