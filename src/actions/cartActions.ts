'use server'
import { CartModel, ProductModel } from '@/db/models'
import { InferAttributes, Op } from 'sequelize'

export type CartRow = Omit<InferAttributes<CartModel>, 'user' | 'userId' | 'discount' | 'createdAt' | 'updatedAt' | 'productId'>
    & Required<Pick<CartModel, 'product'>>

type DeleteResult = {
    success: boolean;
    deletedCount?: number;
    error?: string;
  }


const CART_INCLUDE = [{
    model: ProductModel,
    as: 'product',
    attributes: [
        // todo: remove reduntant atributes
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
        'createdAt',
        'updatedAt',
        'image',
    ]
}]

const mapCartRow = (cart: CartModel): CartRow => {
    if (!cart.product) {
        throw new Error(`Cart row with id ${cart.id} contains no product`)
    }

    return {
        id: cart.id,
        quantity: cart.quantity,
        product: {
            id: cart.product.id,
            isNew: cart.product.isNew,
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
        }
    }
}

// fixme: use real userId
export async function getCart(userId: number = 1): Promise<CartRow[]> {
    const { rows } = await CartModel.findAndCountAll({
        include: CART_INCLUDE,
        where: { userId }
    })

    return rows.map(mapCartRow)
}

export const updateQuantityAction = async ({ id, newQuantity }: { id: number, newQuantity: number }): Promise<CartRow> => {

    if (newQuantity <= 1) {
        await CartModel.update(
            { quantity: 1 },
            { where: { id } }
        )
    } else {
        await CartModel.update(
            { quantity: newQuantity },
            { where: { id } }
        )
    }
    const updatedCart = await CartModel.findByPk(id, { include: CART_INCLUDE })

    if (!updatedCart) {
        throw new Error('updated cart not found')
    }

    return mapCartRow(updatedCart)
}

export const deleteCartRowAction = async (cartId: number) => {
    await CartModel.destroy({
        where: {
            id: cartId,
        }
    })
}

export const deleteSelectedCartRowsAction = async (cartIds: number[]): Promise<DeleteResult> => {
    const ids = await CartModel.destroy({
        where: {
            id: {
                [Op.in]: cartIds
            }
        }
        
    })
    return {
        success: true,
        deletedCount: ids
      };
}

// fixme: use real userId
export const addProductToCartAction = async (productId: number, userId = 1): Promise<CartRow[]> => {
    const existingCartItem = await CartModel.findOne({
        where: {
            productId,
            userId,
        },
        include: CART_INCLUDE
    })
    if (existingCartItem) {
        await existingCartItem.update({
            quantity: existingCartItem.quantity + 1,
        })
    } else {
        await CartModel.create({
            quantity: 1,
            productId,
            userId,
        })
    }
    return getCart(userId)
}
