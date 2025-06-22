'use server'
import { CartModel, ColorModel, ProductModel, ProductVariantModel } from '@/db/models'
import { Op } from 'sequelize'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { CartModelDTO } from '@/db/models/cart.model'

export type CartRow = {
    id: number;
    productId: number;
    colorId: number;
    isActive: boolean;
    articul: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    box_length: number;
    box_height: number;
    box_weight: number;
    price: number;
    product?: { // Опционально, если не всегда включается или может быть null
        id: number;
        name: string;
        articul: string;
        sku: string;
        descriptionShort: string;
        descriptionLong: string;
    };
    color?: { // Опционально
        id: number;
        name: string;
        code: string;
    };
};

// изначально CartModel определена так, что поле productVariant в ней — это просто число (number), потому что это foreignKey (внешний ключ).
//Omit<CartModelDTO, 'productVariant'>: Мы берем исходный тип CartModelDTO (который говорит, что productVariant это number). И мы исключаем из него поле productVariant. В результате получается тип, у которого нет поля productVariant. Затем мы используем оператор & (intersection type) для объединения этого нового типа с другим типом. Этот другой тип просто добавляет поле productVariant, но теперь с правильным, "расширенным" типом CartProductVariant (который описывает, что это целый объект).

export type CartModel = Omit<
    CartModelDTO,
    'productVariant' | 'userId' | 'discount' | 'createdAt' | 'updatedAt' // И добавляем новое поле productVariant, которое будет объектом CartProductVariant
> & {
    productVariant: CartRow
}

type DeleteResult = {
    success: boolean;
    deletedCount?: number;
    error?: string;
}

const CART_INCLUDE = [
    {
        model: ProductVariantModel, // Включаем модель ProductVariantModel
        as: 'product_variants',
        attributes: [
            'id',
            'productId',
            'colorId',
            'isActive',
            'articul',
            'length',
            'width',
            'height',
            'weight',
            'box_length',
            'box_height',
            'box_weight',
            'price',
            // 'cartId'
        ],
        include: [
            {
                model: ProductModel,
                as: 'product',
                attributes: [ 'id', 'name', 'descriptionShort', 'descriptionLong' ]
            },
            {
                model: ColorModel,
                as: 'color',
                attributes: [ 'id', 'name', 'code' ]
            }
        ]
    }
]

const mapCartRow = (cartItem: CartModel) => {
    if (!cartItem.product_variants) {
        throw new Error(`Cart item with id ${cartItem.id} contains no product variant.`)
    }

    const variant = cartItem.product_variants

    return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        productVariant: {
            id: variant.id,
            productId: variant.productId,
            colorId: variant.colorId,
            isActive: variant.isActive,
            articul: variant.articul,
            length: variant.length,
            width: variant.width,
            height: variant.height,
            weight: variant.weight,
            box_length: variant.box_length,
            box_height: variant.box_height,
            box_weight: variant.box_weight,
            price: variant.price,
            ...(variant.product && {
                product: {
                    id: variant.product.id,
                    name: variant.product.name,
                    // articul: variant.product.articul,
                    // sku: variant.product.sku,
                    descriptionShort: variant.product.descriptionShort,
                    descriptionLong: variant.product.descriptionLong,
                }
            }),
            ...(variant.color && {
                color: {
                    id: variant.color.id,
                    name: variant.color.name,
                    code: variant.color.code,
                }
            })
        }
    };
};

// fixme: почему то при заходе на http://127.0.0.1:3000/ сразу ломится за Cart и соотв логиниться CartContext useEffect 84 строка
export async function getCartAction(): Promise<CartRow[]> {
    const session = await getServerSession(authOptions)
    // console.log('Cart Session', session)

    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const userId = session.user.id

    const { rows } = await CartModel.findAndCountAll({
        include: CART_INCLUDE,
        where: { userId }
    })
    console.log('getCartAction Cart rows', rows)
    return rows.map(mapCartRow)
}

export const updateQuantityAction = async ({ id, newQuantity }: { id: number, newQuantity: number, userId?: number}): Promise<CartRow[]> => {
    // await new Promise(async (resolve) => {setTimeout(() => { resolve(undefined) }, 2000)})
    const session = await getServerSession(authOptions)
    console.log('Cart Session', session)
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const userId = session.user.id
    if (newQuantity <= 1) {
        await CartModel.update(
            {quantity: 1},
            {where: {id}}
        )
    } else {
        await CartModel.update(
            {quantity: newQuantity},
            {where: {id}}
        )
    }

    const updatedCart = await CartModel.findAll({where: {userId}, include: CART_INCLUDE})
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
            productVariant: selectedVariantId,
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
            productVariant: selectedVariantId,
            userId,
        })
    }
    return getCartAction(userId)
}
