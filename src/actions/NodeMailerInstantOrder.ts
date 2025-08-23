'use server'

// todo: 1. Сделать нодемейлер независимой функцией, которая принимает тему письма, адреса, тело и все
// 2. Сделать "квикОрдерЭкшн", которая -
//      - проверяет капчу (см пример в некст14) is Ok
//      - сохраняет пользователя is Ok
//      - сохраняет заказ. НЕ ОСОБО НУЖЕН
//      - отправляет письмо ОШИБКА ПОДКЛЮЧЕНИЯ ECONNREFUSED
// 1. Либо почтовый сервер не работает по указанному адресу и порту
// 2. Либо блокируется подключение (например, файрволом)
// 3. Либо неверно указаны параметры подключения к SMTP серверу

// это должно быть 4 разных функции которые собраны в квикОрдерЭкшн
'use server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'russian.education',
    port: 587,
    secure: false, // true для 465 порта, false для других портов
    auth: {
        user: process.env.NODEMAILER_SEND_FROM,
        pass: process.env.NODEMAILER_SENDER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

type SendMailProps = {
    name: string
    phone: string
}

export const nodeMailerInstantOrder = async ({
    name,
    phone
}: SendMailProps) => {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_SEND_FROM,
            to: process.env.NODEMAILER_SEND_TO,
            subject: 'Новый заказ',
            html: `<h2>Новая заявка на заказ</h2>
                    <p><strong>Имя:</strong> ${name}</p>
                    <p><strong>Телефон:</strong> ${phone}</p>
                    <p><strong>Дата:</strong> ${new Date().toLocaleString()}</p>`
        }

        const result = await transporter.sendMail(mailOptions)
        console.log('Письмо отправлено:', result.messageId)
        return true
    } catch (error) {
        console.error('Ошибка отправки письма:', error)
        return false
    }
}
