'use server'

import { cookies } from 'next/headers'
import { CONSENT_KEY } from '@/actions/getCookiesAccepted.ts'

export const setConsentAccepted = async () => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000
    cookies().set(CONSENT_KEY, 'true', { expires: Date.now() + oneWeek })
}
