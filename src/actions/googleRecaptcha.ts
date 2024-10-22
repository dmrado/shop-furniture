import fetch from 'node-fetch'

const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify'
const serverSecret = process.env.RECAPTCHA_SERVER_SECRET

export const validateGoogleRecaptcha = async (token: any): Promise<boolean> => {
    const url = recaptchaUrl + `?secret=${serverSecret}&response=${token}`
    return fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then((data:any) => {
            return !!data?.success
        }).catch(err => {
            console.warn('Error while verifying recaptcha', err)
            return false
        })
}
