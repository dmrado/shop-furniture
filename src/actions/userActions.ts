'use server'
import {AddressModel, OuruserModel} from "@/db/models";
import {InferAttributes, InferCreationAttributes} from "sequelize";

// здесь все обращения к модели User

// Функция обновления состояния согласия на обработку персональных данных
export const updateUserAgreementAction = async (userId: number, isAgreed) => {
    return await OuruserModel.update(
        {
            isAgreed,
            agreementDate: isAgreed ? new Date() : null
        } as Partial<InferAttributes<OuruserModel>>,
        {
            where: {id: userId}
        }
    )
}

export const isAgreedFromModelAction = async (userId): Promise<boolean> => {
    const result = await OuruserModel.findOne({
        where: {id: userId}
    })
    // console.log('result in a isAgreedFromModelAction', result)
    if (!result) {
        return false // Если пользователь не найден
    }
    return result.isAgreed // Вернет true если isAgreed === 1, false в противном случае
}


// сохраняет упрощенного юзера из InstantOrderModal - быстрый заказ
export const createInstantUserAction = async ({name, phone}: {
    name: InferAttributes<OuruserModel> | string,
    phone: InferAttributes<AddressModel> | string
}) => {

    // Сначала проверяем, существует ли пользователь с таким телефоном
    const existingUser = await OuruserModel.findOne({
        include: [{
            model: AddressModel,
            as: 'addresses',
            where: { phone: phone }
        }]
    })
    if (existingUser) {
        return {
            success: false,
            message: 'Пользователь с таким номером телефона уже существует. Пожалуйста, войдите в свой аккаунт.',
            existingUser: existingUser.toJSON()
        };
    }

    const instantUser: InferCreationAttributes<OuruserModel> = await OuruserModel.create({
        name: name,
        isActive: true,
        canContact: true,
        isAgreed: true
    })

    if (!instantUser) {
        throw new Error('instantUser не сохранился');
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

    const newInstantUser = await OuruserModel.findOne({
        include: [{
            model: AddressModel,
            as: 'addresses',
            attributes: ['phone']
        }],
        where: {id: instantUser.id}
    })

    if (!newInstantUser) {
        throw new Error('Произошла ошибка создания мгновенного заказа')
    }

    return {
        success: true,
        user: newInstantUser.toJSON()
    };
}