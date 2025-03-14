'use server'
import { AddressModel, ProfileModel } from '@/db/models'
import { InferAttributes, InferCreationAttributes } from 'sequelize'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// здесь все обращения к модели User

// функция получения сессии юзера для всех клиентских компонентов
export const getCurrentUserAction = async () => {
    const session = await getServerSession(authOptions)
    return session?.user
}

// Функция обновления состояния согласия на обработку персональных данных
export const updateUserAgreementAction = async (userId: string, isAgreed) => {
    const profile = await ProfileModel.findOne({
        where: { userId },
    })

    if (profile) {
        await ProfileModel.update(
            {
                isAgreed,
                agreementDate: isAgreed ? new Date() : null,
            },
            {
                where: { userId },
            }
        )
        return
    }
    await ProfileModel.create({
        userId,
        isAgreed,
        isActive: true,
        agreementDate: isAgreed ? new Date() : null,
    })
}

export const isAgreedFromModelAction = async (userId): Promise<boolean> => {
    const result = await ProfileModel.findOne({
        where: { userId },
    })
    // console.log('result in a isAgreedFromModelAction', result)
    if (!result) {
        return false // Если пользователь не найден
    }
    return result.isAgreed // Вернет true если isAgreed === 1, false в противном случае
}

// сохраняет упрощенного юзера из InstantOrderModal - быстрый заказ
export const createInstantUserAction = async ({
    name,
    phone,
}: {
    name: InferAttributes<ProfileModel> | string;
    phone: InferAttributes<AddressModel> | string;
}) => {
    // Сначала проверяем, существует ли пользователь с таким телефоном
    const existingUser = await ProfileModel.findOne({
        include: [
            {
                model: AddressModel,
                as: 'addresses',
                where: { phone: phone },
            },
        ],
    })
    if (existingUser) {
        return {
            success: false,
            message:
                'Пользователь с таким номером телефона уже существует. Пожалуйста, войдите в свой аккаунт.',
            existingUser: existingUser.toJSON(),
        }
    }

    const instantUser: InferCreationAttributes<ProfileModel> =
        await ProfileModel.create({
            name: name,
            isActive: true,
            canContact: true,
            isAgreed: true,
        })

    if (!instantUser) {
        throw new Error('instantUser не сохранился')
    }

    const address = await AddressModel.create({
        userId: instantUser.id,
        phone: phone,
        city: 'Уточняется',
        street: 'Уточняется',
        home: 'Уточняется',
        corps: '', // есть defaultValue в модели
        appart: '', // есть defaultValue в модели
        isMain: true,
    })

    const newInstantUser = await ProfileModel.findOne({
        include: [
            {
                model: AddressModel,
                as: 'addresses',
                attributes: [ 'phone' ],
            },
        ],
        where: { id: instantUser.id },
    })

    if (!newInstantUser) {
        throw new Error('Произошла ошибка создания мгновенного заказа')
    }

    return {
        success: true,
        user: newInstantUser.toJSON(),
    }
}
