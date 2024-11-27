import UserCart from '@/components/user/UserCart'
import {CartModel} from '@/db/models/cart.model'
import {ProductModel} from '@/db/models/product.model'

const CartPage = async () => {

    const cartData = await CartModel.findAndCountAll({
        include: [{
            model: ProductModel,
            as: 'product',
            required: false,
            attributes: [
                'id',
                'isActive',
                'articul',
                'sku',
                'name',
                'description_1',
                'description_2',
                'length',
                'width',
                'height',
                'weight',
                'box_length',
                'box_height',
                'box_weight',
                'old_price',
                'new_price',
                'primary_color',
                'secondary_color',
                'inStock',
                'createdAt',
                'updatedAt',
                'image',
            ]
        }]
    })
    if (!cartData || !cartData.rows.length) {
        return 'Корзина пуста'
    }
    console.log('Raw cart data:', JSON.stringify(cartData.rows[0], null, 2))

    const cartList = cartData.rows.map(cart => ({
        // Поля из таблицы carts
        id: cart.id,
        productId: cart.productId,
        quantity: cart.quantity,
        userId: cart.userId,
        createdAt: cart?.createdAt,
        updatedAt: cart?.updatedAt,
        discount: cart.discount,
        // Вложенный объект products
        product: cart.product ? {
            id: cart.product.id,
            isActive: cart.product.isActive,
            articul: cart.product.articul,
            sku: cart.product.sku,
            name: cart.product.name,
            description_1: cart.product.description_1,
            description_2: cart.product.description_2,
            length: cart.product.length,
            width: cart.product.width,
            height: cart.product.height,
            weight: cart.product.weight,
            box_length: cart.product.box_length,
            box_height: cart.product.box_height,
            box_weight: cart.product.box_weight,
            image: cart.product.image,
            old_price: cart.product.old_price,
            new_price: cart.product.new_price,
            primary_color: cart.product.primary_color,
            secondary_color: cart.product.secondary_color,
            inStock: cart.product.inStock
        } : null
    }));

    return <>
        {/*todo превратить в отдельный компонент Total для стейта итого и только для этого*/}
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Корзина</h2>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded"/>
                        <span>Выбрать все</span>
                    </label>
                    <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded">
                        Удалить выбранные
                    </button>
                    {/*<button className="px-4 py-2 hover:bg-gray-100 rounded">*/}
                    {/*    Поделиться*/}
                    {/*</button>*/}
                </div>
            </div>

            <div className="mt-6 text-right">
                <div className="text-2xl font-bold">
                    Итого:
                    {/*{total.toFixed(2)} ₽*/}
                </div>
            </div>
        </div>
        <ul>
            {cartList.map(cart =>
                <li key={cart.id}>
                    <UserCart cartItem={cart}
                              // orderedProduct={orderedProductQuantities}
                    />
                </li>
            )}
        </ul>
    </>
}

export default CartPage