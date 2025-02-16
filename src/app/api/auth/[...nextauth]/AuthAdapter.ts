import {Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters"
import {AddressModel, UserModel} from '@/db/models'

export function AuthAdapter(): Adapter {
    return {
       createUser:  async (user) => {
            const newUser = await UserModel.create({
                agreementDate: new Date(),
                email: user.email,
                name: user.name || '',
                isActive: true,
                isAgreed: false,
                surName: '',
                fatherName: '',
                canContact: true,
                // provider: user.provider,
                // providerAccountId: user.providerAccountId
            })
            // todo если в БД появятся секретные данные то сделать выборочный return
            return newUser.toJSON()
        },

        getUser: async (id) => {
            const user = await UserModel.findByPk(parseInt(id), {
                include: [{
                    model: AddressModel,
                    as: 'addresses'
                }]
            })
            return user ? user.toJSON() : null
        },

        getUserByEmail: async (email) => {
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
        getUserByAccount: async ({providerAccountId, provider}) => {
            const account = await UserModel.findOne({
                where: {
                    provider,
                    providerAccountId
                }
            })
            return account ? account.toJSON() : null
        },

        // Обязательный метод для связывания аккаунта с пользователем
        linkAccount: async (account) => {
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
        getSessionAndUser: async (sessionToken) => {
           console.log('sessionToken', sessionToken)
            return null
        },
        // async updateSession(session) {
        //     return session
        // },
        // async deleteSession(sessionToken) {
        // },
    }
}