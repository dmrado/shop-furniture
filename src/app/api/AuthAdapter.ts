import {Adapter, AdapterAccount, AdapterUser, AdapterSession, VerificationToken} from "next-auth/adapters"
import {UserModel} from '@/db/models'

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

            return {
                id: newUser.id.toString(),
                email: newUser.email,
                name: newUser.name,
                emailVerified: null
            }
        },

        // Другие необходимые методы адаптера...
        async getUser(id) {
            const user = await UserModel.findByPk(parseInt(id))
            if (!user) return null

            return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                emailVerified: null
            }
        },

        async getUserByEmail(email) {
            const user = await UserModel.findOne({where: {email}})
            if (!user) return null

            return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                emailVerified: null
            }
        },

        // ... другие методы адаптера
    }
}