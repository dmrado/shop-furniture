import NextAuth, { DefaultSession } from 'next-auth'
// import { authConfig } from '../../../auth.ts'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'
import {Awaitable} from "next-auth/src/core/types";
// todo: no sense to have this constant separately
const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile , user, email, credentials}) {
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
            return new Promise<DefaultSession>(resolve => {
                // resolve({
                //   user: { name: 'XX', email: 'xx@yy.ru', image: null },
                //   expires: '' })
                resolve(session)
            })
        },
        async redirect ({url,  baseUrl}) {
            console.warn('redirect url', url)
            console.warn('redirect baseUrl', baseUrl)

            return ''
        },
        async jwt({token, user, account, profile, trigger, isNewUser, session}){
            console.warn('jwt session', session)
            console.warn('jwt token', token)
            console.warn('jwt user', user)
            console.warn('jwt isNewUser', isNewUser)
            console.warn('jwt trigger', trigger)
            console.warn('jwt profile', profile)
            console.warn('jwt account', account)
            return {email: user.email, grandmother: 'Galina'}
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
        })
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
    //пример приватного роута
    // pages: {
    //    signIn: '/signin'
    // }
})

export { handler as GET, handler as POST }
