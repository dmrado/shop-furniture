import { Session } from 'next-auth'
export const isSessionExpired = (session: Session) => {
    if (session && new Date(session.expires) < new Date()) {
        return true // Сеанс истек
    } else {
        return false // Сеанс действителен
    }
}
