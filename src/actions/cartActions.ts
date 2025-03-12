'use server'
import { CartModel, ProductModel } from '@/db/models'
import { InferAttributes, Op } from 'sequelize'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {redirect} from "next/navigation";

export type CartRow =
    Omit<InferAttributes<CartModel>, 'user' | 'userId' | 'discount' | 'createdAt' | 'updatedAt' | 'productId'>
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

// fixme: почему то при заходе на http://127.0.0.1:3000/ сразу ломится за Cart и соотв логиниться CartContext useEffect 84 строка
export async function getCartAction(): Promise<CartRow[]> {
    const session = await getServerSession(authOptions)
    console.log('Cart Session', session)
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const userId = session.user.id

    const { rows } = await CartModel.findAndCountAll({
        include: CART_INCLUDE,
        where: { userId }
    })

    return rows.map(mapCartRow)
}

export const updateQuantityAction = async ({ id, newQuantity}: {
    id: number,
    newQuantity: number,
    userId?: number
}):
    Promise<CartRow[]> => {
    // await new Promise(async (resolve) => {setTimeout(() => { resolve(undefined) }, 2000)})
    const session = await getServerSession(authOptions)
    console.log('Cart Session', session)
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const userId = session.user.id
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

    const updatedCart = await CartModel.findAll({ where: { userId }, include: CART_INCLUDE })
    if (!updatedCart.length) {
        throw new Error('updated cart not found')
    }

    return updatedCart.map(mapCartRow)
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
    }
}

export const addProductToCartAction = async (productId: number, quantity: number): Promise<CartRow[]> => {
    const session = await getServerSession(authOptions)
    console.log('Cart Session', session)
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const userId = session.user.id
    const existingCartItem = await CartModel.findOne({
        where: {
            productId,
            userId,
        },
        include: CART_INCLUDE
    })
    if (existingCartItem) {
        await existingCartItem.update({
            quantity: existingCartItem.quantity + quantity,
        })
    } else {
        await CartModel.create({
            quantity: quantity,
            productId,
            userId,
        })
    }
    return getCartAction(userId)
}
