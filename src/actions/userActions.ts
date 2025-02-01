'use server'
import {UserModel} from "@/db/models";
import {InferAttributes} from "sequelize";

// Функция обновления состояния согласия на обработку персональных данных
export const updateUserAgreementAction = async (userId: number, isAgreed) => {
    return await UserModel.update(
        {
            isAgreed,
            agreementDate: isAgreed ? new Date() : null
        }  as Partial<InferAttributes<UserModel>>,
        {
            where: { id: userId }
        }
    );
};