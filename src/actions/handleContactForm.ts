'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FILE_LIMIT, TITLE_MIN_LENGTH } from '@/app/constants.ts'
import { sendMail } from '@/actions/nodemailer.ts'
import { validateGoogleRecaptcha } from '@/actions/googleRecaptcha.ts'

class ValidationError extends Error {}

type ContactData = {
    name: string
    email: string
    title: string
    message: string
    recaptchaToken: string
}
const cleanFormData = (formData: FormData): ContactData => {
    const name = formData.get('name')
    const email = formData.get('email')
    const title = formData.get('title')
    const message = formData.get('message')
    const recaptchaToken = formData.get('recaptcha_token') ?? ''

    if (
        typeof recaptchaToken !== 'string' ||
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof title !== 'string' ||
        typeof message !== 'string'
    ) {
        throw new ValidationError('Filedata in text fields')
    }
    if (!title || !message || !name || !email) {
        throw new ValidationError('Title or text is null')
    }
    if (title.length < TITLE_MIN_LENGTH) {
        throw new ValidationError('Title too short')
    }

    if (recaptchaToken.length < TITLE_MIN_LENGTH) {
        throw new ValidationError('Token is required')
    }

    return { name, email, title, message, recaptchaToken }
}

export const handleContactForm = async (
    formState: { message: string },
    formData: FormData
) => {
    try {
        const { name, email, title, message, recaptchaToken } =
            cleanFormData(formData)
        console.log('name, email, title, message', name, email, title, message)
        if (!(await validateGoogleRecaptcha(recaptchaToken))) {
            return { message: 'Мы не смогли проверить что вы не робот' }
        }
        await sendMail({ name, email, title, message })
    } catch (err) {
        console.error('Error on handleForm:  ', err)
        if (err instanceof ValidationError) {
            return redirect('/api/error/?code=400&message=VALIDATION_ERROR')
        }
        return redirect('/api/error/?code=500&message=SERVER_ERROR')
    }
    revalidatePath('/information')
    return { message: 'Ваша информация успешно отправлена' }
}
