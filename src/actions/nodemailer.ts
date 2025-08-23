import nodemailer from 'nodemailer'

const transporter = (nodemailer.createTransport = {
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
    name: string
    email: string
    title: string
    message: string
}
const renderHtml = ({ name, email, title, message }: SendMailProps) => {
    return `
        <h3>Имя: ${name}</h3>
        <p>email: ${email}</p>
        <p>Заголовок: ${title}</p>
        <h4>Сообщение: ${message}</h4>`
}
export const sendMail = async (props: SendMailProps) => {
    const result = await transporter.sendMail({
        from: `"My team" <${config.auth.user}>`,
        to: config.to,
        subject: 'Сообщение с сайта Бейт-Иешуа',
        text: 'Посетитель оставил сообщение: ',
        html: renderHtml(props)
    })

    console.log(result)
}
