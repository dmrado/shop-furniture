'use client'
import { useState } from 'react'
import { setConsentAccepted } from '@/actions/setCookiesAccepted.ts'
import Link from 'next/link'

const CookieConsent = ({ isAccepted }: {isAccepted: boolean}) => {

    const [ showMessage, setShowMessage ] = useState(true)
    const handleAccept = async () => {
        await setConsentAccepted()
        setShowMessage(false)
    }
    if (isAccepted) return <></>
    if (!showMessage) return <></>

    return (
        <div
            className="flex flex-col fixed bottom-0 bg-gray-600 rounded pt-2 px-2 text-white text-s text-center z-20">
            На этом сайте мы используем файлы cookie, чтобы улучшить ваш опыт использования и предоставить
            персонализированный контент. Некоторые из этих файлов cookie устанавливаются сторонними сервисами, такими
            как Google (Google является зарегистрированным товарным знаком Google LLC) и Яндекс (Яндекс является зарегистрированным товарным знаком Яндекса).

            Мы используем Google reCAPTCHA для защиты нашего сайта от злоумышленников и
            спама. Google reCAPTCHA помогает нам убедиться, что вы человек, а не автоматизированная программа.

            Мы также используем Яндекс.Карты для предоставления вам удобных карт и
            местоположений на нашем сайте. Это поможет вам быстро найти нужные адреса и маршруты.

            Кроме того, как разработчик этого сайта, мы используем файлы cookie для сохранения вашего выбора
            относительно использования файлов cookie. Для получения более подробной информации о том, как мы обрабатываем ваши данные пожалуйста, обратитесь к нашей
            <Link href={'/policy'}><u>Политике конфиденциальности в отношении персональных данных</u></Link>
            <br/>
            Продолжая использовать наш сайт, вы соглашаетесь с использованием указанных файлов cookie в
            соответствии с указанной Политикой конфиденциальности в отношении персональных данных.

            <form action={handleAccept}>
                <button className='btn btn-blog' style={{ marginRight: '21px' }}>Согласен</button>
            </form>
        </div>
    )
}
export default CookieConsent
