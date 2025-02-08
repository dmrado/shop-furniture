'use server'
import {AddressModel, UserModel} from "@/db/models";
import {InferAttributes, InferCreationAttributes} from "sequelize";

// здесь все обращения к модели User

// Функция обновления состояния согласия на обработку персональных данных
export const updateUserAgreementAction = async (userId: number, isAgreed) => {
    return await UserModel.update(
        {
            isAgreed,
            agreementDate: isAgreed ? new Date() : null
        } as Partial<InferAttributes<UserModel>>,
        {
            where: {id: userId}
        }
    )
}

export const isAgreedFromModelAction = async (userId): Promise<boolean> => {
    const result = await UserModel.findOne({
        where: {id: userId}
    })
    console.log('result in a isAgreedFromModelAction', result)
    if (!result) {
        return false // Если пользователь не найден
    }
    return result.isAgreed // Вернет true если isAgreed === 1, false в противном случае
}


// сохраняет упрощенного юзера из InstantOrderModal - быстрый заказ
export const createInstantUserAction = async ({name, phone}: { name: InferAttributes<UserModel>, phone: InferAttributes<UserModel> }) => {

    const instantUser: InferCreationAttributes<UserModel>  = await UserModel.create({
        name: name,
        isActive: true,
        canContact: true,
        isAgreed: true
    })

    const instantAddress: InferCreationAttributes<UserModel> = await AddressModel.create({
        userId: instantUser.id,
        phone: phone,
        city: 'Уточняется',
        street: 'Уточняется',
        home: 'Уточняется',
        corps: '', // есть defaultValue в модели
        appart: '', // есть defaultValue в модели
        isMain: true,
    })

    return {success: true, userId: instantUser.id, phone: instantAddress.phone}
}