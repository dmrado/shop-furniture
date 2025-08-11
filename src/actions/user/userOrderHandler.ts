import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const userOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { selectedAddress, fullName, phoneNumber } = req.body

        // Настройка Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // или другой почтовый сервис
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: 'Новый заказ',
            text: `Получатель: ${fullName}nТелефон: ${phoneNumber}nАдрес: ${selectedAddress}`,
        }

        try {
            await transporter.sendMail(mailOptions)
            res.status(200).json({ message: 'Заказ успешно отправлен' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Ошибка при отправке заказа' })
        }
    } else {
        res.setHeader('Allow', [ 'POST' ])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

// export default userOrderHandler
