import { Session } from 'next-auth'

export const isAdmin = (session: Session | null) => {
    console.log('session', session)
    if (!session) {
        return false //пользователь не залогинен
    }
    if(!session.user || !session.user.email) {
        return false //если есть ошибка на стороне гугла или яндекса: они вернули сессию без юзера
    }
    const adminEmails = process.env.USER_EMAIL?.split(',') ?? []
    console.log(adminEmails, session.user.email)
    console.log(adminEmails.includes(session.user.email))
    return adminEmails.includes(session.user.email) //прроверили что adminEmails содкржит пришедший с провайдера email
}
