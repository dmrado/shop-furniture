import { cookies } from 'next/headers'

export const CONSENT_KEY = 'cookie-accepted'

export const getConsentAccepted = async () => {
    return cookies().get(CONSENT_KEY)?.value
}
