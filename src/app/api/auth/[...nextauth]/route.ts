import NextAuth, { AuthOptions, DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'
import SequelizeAdapter, { models } from '@auth/sequelize-adapter'
import { sequelize } from '@/db/connection'
import { AuthUserModel } from '@/db/models/users.model'
import { AccountModel, AddressModel, ProfileModel, SessionModel, CartModel } from '@/db/models'

// todo: no sense to have this constant separately

//todo добавить isSessionExpired(session) или он зашит в JWT
export const authOptions: AuthOptions = {
    adapter: SequelizeAdapter(sequelize,
        {
            // timestamps: true, // важно!
            models: {
                User: AuthUserModel,
                // Account: AccountModel,
                // VerificationToken: VerificationTokenModel,
                // Session: SessionModel
                Account: sequelize.define('AuthAccount', { ...models.Account }, { tableName: 'auth_accounts' }),
                VerificationToken: sequelize.define('AuthVerificationToken', { ...models.VerificationToken }, { tableName: 'auth_verification_tokens' }),
                Session: sequelize.define('AuthSession', { ...models.Session }, { tableName: 'auth_sessions' })
            }
        }
    ),
    secret: process.env.NEXTAUTH_SECRET,
    session: {strategy: 'jwt'},
    // session: { strategy: 'database' },
    callbacks: {
        async signIn({ account, profile, user, email, credentials }) {
            console.warn('signIn account', account)
            console.warn('signIn profile', profile)
            console.warn('signIn user', user)
            console.warn('signIn email', email)
            console.warn('signIn credentials', credentials)
            if (account && account.provider === 'google') {
                return true
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async session({ session, token, user, newSession, trigger }) {
            console.warn('session session', session)
            console.warn('session token', token)
            console.warn('session user', user)
            console.warn('session newSession', newSession)
            console.warn('session trigger', trigger)
            return {
                ...session,
                user: {
                    email: token.email,
                    id: token.sub,
                    name: token.name,
                    picture: token.picture,
                },
                include: [
                    {
                        model: AddressModel,
                        as: 'addresses'
                    },
                    {
                        model: ProfileModel,
                        as: 'profile'
                    },
                    {
                        model: CartModel,
                        as: 'cart'
                    }]
            }
        },
        async redirect({ url, baseUrl }) {
            console.warn('redirect url', url)
            console.warn('redirect baseUrl', baseUrl)

            return baseUrl
        },
        async jwt({ token, user, account, profile, trigger, isNewUser, session }) {
            console.warn('jwt session', session)
            console.warn('jwt token', token)
            console.warn('jwt user', user)
            console.warn('jwt isNewUser', isNewUser)
            console.warn('jwt trigger', trigger)
            console.warn('jwt profile', profile)
            console.warn('jwt account', account)
            return {
                ...token,
            }
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            },
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID ?? '',
            clientSecret: process.env.YANDEX_CLIENT_SECRET ?? ''
        }),
        // Credentials({
        // credentials: {
        //    email: { label: 'email', type: 'email', required: true },
        //    password: { label: 'password', type: 'password', required: true }
        // },
        // async authorize(credentials) {
        //    if(!credentials?.email || !credentials.password) return null
        //    const currentUser: User = users.find(user => user.email === credentials.email): User
        //    if(currentUser && currentUser.password === credentials.password) {
        //       const{ password, ...userWithoutPassword } = currentUser
        //       return userWithoutPassword as User
        //    }
        //    return null
        // }
        // })
    ],
    // todo Добавьте настройки для cookies в конфигурацию NextAuth иначе: TypeError: State cookie was missing.
    //  name: 'OAuthCallbackError',
    //     code: undefined
    //   },
    //   providerId: 'google',
    //   message: 'State cookie was missing.'
    // cookies: {
    //     sessionToken: {
    //         name: 'next-auth.session-token',
    //         options: {
    //             httpOnly: true,
    //             sameSite: 'lax',
    //             path: '/',
    //             secure: process.env.NODE_ENV === 'production'
    //         }
    //     },
    //     callbackUrl: {
    //         name: 'next-auth.callback-url',
    //         options: {
    //             sameSite: 'lax',
    //             path: '/',
    //             secure: process.env.NODE_ENV === 'production'
    //         }
    //     },
    //     csrfToken: {
    //         name: 'next-auth.csrf-token',
    //         options: {
    //             httpOnly: true,
    //             sameSite: 'lax',
    //             path: '/',
    //             secure: process.env.NODE_ENV === 'production'
    //         }
    //     }
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
