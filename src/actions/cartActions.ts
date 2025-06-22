'use server'
import { CartModel, ProductModel } from '@/db/models'
import { InferAttributes, Op } from 'sequelize'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { CartModelDTO } from '@/db/models/cart.model'

export type CartRow = Omit<InferAttributes<CartModelDTO>, 'user' | 'userId' | 'discount' | 'createdAt' | 'updatedAt' | 'productId'> & Required<Pick<CartModel, 'product'>>

type DeleteResult = {
    success: boolean;
    deletedCount?: number;
    error?: string;
}

const CART_INCLUDE = [{
    model: ProductModel,
    as: 'product',
    attributes: [
        'id',
        'styleId',
        'brandId',
        'collectionId',
        'countryId',
        'name',
        'articul',
        'sku',
        'descriptionShort',
        'descriptionLong',
        'isNew',
        'isActive',
        'createdAt',
        'updatedAt',
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
            styleId: cart.product.styleId,
            brandId: cart.product.brandId,
            collectionId: cart.product.collectionId,
            countryId: cart.product.countryId,
            name: cart.product.name,
            articul: cart.product.articul,
            sku: cart.product.sku,
            descriptionShort: cart.product.descriptionShort,
            descriptionLong: cart.product.descriptionLong,
            isNew: cart.product.isNew,
            isActive: cart.product.isActive,
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

export const updateQuantityAction = async ({ id, newQuantity }: {
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

export const addProductToCartAction = async (selectedVariantId: number, quantity: number): Promise<CartRow[]> => {

    const session = await getServerSession(authOptions)

    console.log('Cart Session', session)
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const userId = session.user.id
    const existingCartItem = await CartModel.findOne({
        where: {
            selectedVariantId,
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
