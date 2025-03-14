import Image from 'next/image';
import Link from 'next/link';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className="w-full max-w-md text-center">
                {/* Улучшенная SVG корзинка с грустным лицом */}
                <div className="mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 relative mb-6">
                    <svg
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        {/* Корзина - более художественная с плавными линиями */}
                        <path
                            d="M40 70C40 70 45 65 50 65H150C155 65 160 70 160 70L155 145C154 155 152 160 145 160H55C48 160 46 155 45 145L40 70Z"
                            fill="#F9FAFB"
                            stroke="#6B7280"
                            strokeWidth="3"
                            strokeLinejoin="round"
                        />

                        {/* Декоративные элементы корзины */}
                        <path
                            d="M50 65L60 85M150 65L140 85"
                            stroke="#6B7280"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Плетение корзины - горизонтальные линии */}
                        {/*<path*/}
                        {/*    d="M45 90H155M48 110H152M50 130H150"*/}
                        {/*    stroke="#9CA3AF"*/}
                        {/*    strokeWidth="1.5"*/}
                        {/*    strokeLinecap="round"*/}
                        {/*    strokeDasharray="3 4"*/}
                        {/*/>*/}

                        {/* Плетение корзины - вертикальные линии */}
                        {/*<path*/}
                        {/*    d="M60 70V155M80 70V155M100 70V155M120 70V155M140 70V155"*/}
                        {/*    stroke="#9CA3AF"*/}
                        {/*    strokeWidth="1"*/}
                        {/*    strokeLinecap="round"*/}
                        {/*    strokeDasharray="2 6"*/}
                        {/*/>*/}

                        {/* Изящная ручка корзины */}
                        <path
                            d="M65 70C65 50 75 35 100 35C125 35 135 50 135 70"
                            stroke="#6B7280"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Грустные глаза */}
                        <circle cx="80" cy="100" r="5" fill="#6B7280" />
                        <circle cx="120" cy="100" r="5" fill="#6B7280" />

                        {/* Слезинка */}
                        <path
                            d="M80 110C80 110 75 125 80 130"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Грустный рот */}
                        <path
                            d="M85 125C90 120 110 120 115 125"
                            stroke="#6B7280"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
                    Ой! Я всё ещё пуста!
                </h2>
                <p className="text-gray-500 mb-8">
                    Ваша корзина скучает без товаров. Давайте это исправим!
                </p>

                <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                    Начать покупки
                </Link>
            </div>
        </div>
    );
};

export default EmptyCart;
