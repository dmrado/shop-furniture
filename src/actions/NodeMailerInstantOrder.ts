'use server'

// todo: 1. Сделать нодемейлер независимой функцией, которая принимает тему письма, адреса, тело и все
// 2. Сделать "квикОрдерЭкшн", которая -
//      - проверяет капчу (см пример в некст14)
//      - сохраняет пользователя
//      - сохраняет заказ.
//      - отправляет письмо
// это должно быть 4 разных функции которые собраны в квикОрдерЭкшн

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'russian.education',
    port: 587,
    to: process.env.NODEMAILER_SEND_TO,
    auth: {
        user: process.env.NODEMAILER_SEND_FROM,
        pass: process.env.NODEMAILER_SENDER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
type SendMailProps = {
    name: string,
    phone: string,
    captchaValue: string
}
export const nodeMailerInstantOrder = async ({ name, phone, captchaValue }: SendMailProps) => {
    // Проверка капчи
    const captchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CLIENT_SECRET}&response=${captchaValue}`,
        { method: 'POST' }
    )
    const captchaData = await captchaResponse.json()

    if (!captchaData.success) {
        throw new Error('Captcha verification failed')
    }

    // Отправка email
    const result = await transporter.sendMail({
        from: process.env.NODEMAILER_SEND_FROM,
        to: process.env.NODEMAILER_SEND_TO,
        subject: 'Новый заказ',
        html:
            `<h2>Новая заявка на заказ</h2>
        <p><strong>Имя:</strong> ${name}</p>
    <p><strong>Телефон:</strong> ${phone}</p>
    <p><strong>Дата:</strong> ${new Date().toLocaleString()}</p>`
        ,
    })
    console.log(result)
}
