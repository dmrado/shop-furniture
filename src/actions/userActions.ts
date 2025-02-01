'use server'
import {UserModel} from "@/db/models";
import {InferAttributes} from "sequelize";

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

    console.log('result', result)

    if (!result) {
        return false // Если пользователь не найден
    }

    return result.isAgreed === 1 // Вернет true если isAgreed === 1, false в противном случае
}
