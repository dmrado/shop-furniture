import {Adapter, AdapterUser, } from "next-auth/adapters"
import {AddressModel, UserModel} from '@/db/models'

export function AuthAdapter(): Adapter {
    return {
        async createUser(user) {
            const newUser = await UserModel.create({
                email: user.email,
                name: user.name || '',
                isActive: true,
                isAgreed: false,
                surName: '',
                fatherName: '',
                canContact: true
            })
            return newUser.toJSON()
        },

        async getUser(id) {
            const user = await UserModel.findByPk(parseInt(id))
            if (!user) return null

            return user ? user.toJSON() : null
        },

        async getUserByEmail(email) {
            const user = await UserModel.findOne({
                where: {email},
                include: [{
                    model: AddressModel,
                    as: 'addresses'
                }]
            })
            return user ? user.toJSON() : null
        },

        // Обязательный метод для OAuth
        async getUserByAccount({providerAccountId, provider}) {
            const account = await UserModel.findOne({
                where: {
                    provider,
                    providerAccountId
                }
            })
            return account ? account.toJSON() : null
        },

        // Обязательный метод для связывания аккаунта с пользователем
        async linkAccount(account) {
            await UserModel.update(
                {provider: account.provider, providerAccountId: account.providerAccountId},
                {where: {id: account.userId}}
            )
            return account
        },

        // Остальные обязательные методы
        // async updateUser(user) {
        //     return user
        // },
        // async deleteUser(userId) {
        // },
        // async createSession(session) {
        //     return session
        // },
        // async getSessionAndUser(sessionToken) {
        //     return null
        // },
        // async updateSession(session) {
        //     return session
        // },
        // async deleteSession(sessionToken) {
        // },
    }
}