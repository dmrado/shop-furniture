import Image from 'next/image'
import Link from 'next/link'

const UnauthorizedUser = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className="w-full max-w-md text-center">
                {/* SVG человечка с маской */}
                <div className="mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 relative mb-6">
                    <svg
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        {/* Тело */}
                        <path
                            d="M100 120C120 120 135 105 135 85C135 65 120 50 100 50C80 50 65 65 65 85C65 105 80 120 100 120Z"
                            fill="#F3F4F6"
                            stroke="#6B7280"
                            strokeWidth="3"
                        />
                        {/* Маска-очки */}
                        <path
                            d="M70 85C70 75 80 70 85 70H115C120 70 130 75 130 85C130 95 120 100 115 100H85C80 100 70 95 70 85Z"
                            fill="#4B5563"
                            stroke="#1F2937"
                            strokeWidth="2"
                        />
                        {/* Отверстия для глаз */}
                        <circle cx="85" cy="85" r="8" fill="#111827" />
                        <circle cx="115" cy="85" r="8" fill="#111827" />
                        {/* Блики на очках */}
                        <circle cx="82" cy="82" r="2" fill="white" />
                        <circle cx="112" cy="82" r="2" fill="white" />
                        {/* Тело (маленькое) */}
                        <path
                            d="M85 120V150C85 160 115 160 115 150V120"
                            fill="#F3F4F6"
                            stroke="#6B7280"
                            strokeWidth="3"
                        />
                        {/* Руки */}
                        <path
                            d="M85 130H65C60 130 55 135 60 140C65 145 75 140 85 140"
                            fill="#F3F4F6"
                            stroke="#6B7280"
                            strokeWidth="2"
                        />
                        <path
                            d="M115 130H135C140 130 145 135 140 140C135 145 125 140 115 140"
                            fill="#F3F4F6"
                            stroke="#6B7280"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
                    Кто вы, незнакомец?
                </h2>
                <p className="text-gray-500 mb-8">
                    Похоже, вы ещё не вошли в систему. Авторизуйтесь, чтобы
                    получить доступ к персональным функциям.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/api/auth/signin"
                        className="inline-flex items-center justify-center px-12 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                    >
                        Войти
                    </Link>
                    {/*<Link*/}
                    {/*    href="/register"*/}
                    {/*    className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"*/}
                    {/*>*/}
                    {/*    Зарегистрироваться*/}
                    {/*</Link>*/}
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedUser
