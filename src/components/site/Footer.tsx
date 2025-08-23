import Link from 'next/link'
import { Decoro } from '@/components/site/img/Decoro.tsx'

const NavStick = () => {
    return (
        <>
            <div className="hidden md:block w-px h-8 bg-[#E99C28] ml-9 mr-10"></div>
        </>
    )
}

export default function Footer() {
    return (
        <footer className="bg-black text-white w-full py-12 lg:px-40 xl:px-52 border-t border-[#E99C28]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between mb-10">
                    <div className="mb-8 md:mb-0">
                        <Decoro width={135} height={35} className="" />
                    </div>
                    <div className="grid grid-cols-2 md:ml-40 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-white mb-4 font-medium hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                Каталог
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/kitchen"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Кухни
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/sofas"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Диваны
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/bathroom"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Ванные
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/livingroom"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Гостинные
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/children"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Детские
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/bedroom"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Спальни
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/light"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Свет
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/decor"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Декор
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white mb-4 font-medium hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                Контакты
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        О нас
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/vacancies"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Вакансии
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/search"
                                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                                    >
                                        Поиск
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0">
                        <button className="border border-[#E99C28] text-white px-4 py-2 rounded hover:bg-[#E99C28] transition-colors duration-200 flex items-center cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            Заказать обратный звонок
                        </button>
                    </div>
                </div>

                <div className="pt-8 mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                    <Link
                        href="/privacy"
                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                    >
                        Политика конфиденциальности
                    </Link>
                    <NavStick />
                    <Link
                        href="/personal-data"
                        className="text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer"
                    >
                        Политика обработки персональных данных
                    </Link>
                </div>
            </div>
        </footer>
    )
}
