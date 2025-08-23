'use client'
import Carousel from '@/components/site/Carousel'
import Image from 'next/image'

const MainPage = () => {
    return (
        <main>
            <Carousel />
            <div className="container mx-auto px-4 py-8">
                {/* Верхний ряд карточек */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-12 left-12 text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                <h3 className="text-xl font-medium ">
                                    Гостинные
                                </h3>
                                <button className="text-sm mt-1">
                                    Смотреть каталог →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/gostinnie.png"
                            alt="Гостинные"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-12 left-12 text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                <h3 className="text-xl font-medium ">Кухни</h3>
                                <button className="text-sm mt-1">
                                    Смотреть каталог →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/kuhni.png"
                            alt="Кухни"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Второй ряд карточек */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-12 left-12 text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                <h3 className="text-xl font-medium ">Свет</h3>
                                <button className="text-sm mt-1">
                                    Смотреть каталог →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/svet.png"
                            alt="Свет"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-12 left-12 text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                <h3 className="text-xl font-medium ">
                                    Спальни
                                </h3>
                                <button className="text-sm mt-1">
                                    Смотреть каталог →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/spalni.png"
                            alt="Спальни"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-12 left-12 text-white hover:text-[#E99C28] transition-colors duration-300 cursor-pointer">
                                <h3 className="text-xl font-medium ">Декор</h3>
                                <button className="text-sm mt-1">
                                    Смотреть каталог →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/decor.png"
                            alt="Декор"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="relative group mb-8"></div>

                {/* Открыть весь каталог */}
                <div className="flex text-center mb-6 items-center justify-center">
                    <hr className="flex-grow border-1 border-[#E99C28]"></hr>
                    {/* Короткая горизонтальная линия до */}
                    <button className="text-sm w-[300] text-[#171613] mx-4">
                        Открыть весь каталог
                    </button>
                    {/* Короткая горизонтальная линия после */}
                    <hr className="flex-grow border-1 border-[#E99C28]"></hr>
                </div>

                {/* О компании */}
                <div className="flex flex-col md:flex-row mb-8 lg:px-28">
                    <div className="md:w-2/3 pr-8">
                        <h2 className="text-[#E99C28] text-4xl mb-4">DECORO</h2>
                        <p className="text-[#171613] mb-4">
                            Мы гордимся тем, что{' '}
                            <b>
                                {' '}
                                сотрудничаем с лучшими дизайнерами и мастерами
                            </b>
                            , которые используют только высококачественные
                            материалы и современные технологии. В нашем
                            ассортименте вы найдете эксклюзивные предметы
                            мебели, которые идеально впишутся в любой интерьер —
                            от классического до современного.
                            <b> Каждая деталь тщательно продумана</b>, чтобы
                            обеспечить не только эстетическое наслаждение, но и
                            максимальный комфорт. <br />
                            Кроме мебели, мы предлагаем{' '}
                            <b>широкий выбор декора</b>: от изысканных
                            светильников и текстиля до уникальных аксессуаров,
                            которые добавят вашему пространству неповторимый
                            шарм. Мы уверены, что{' '}
                            <b>
                                каждый дом заслуживает быть красивым и уютным.
                            </b>{' '}
                            <br />
                            Приглашаем вас посетить наш магазин и открыть для
                            себя мир элитной мебели и декора, где качество
                            встречается с элегантностью.{' '}
                            <b>
                                Создайте свой идеальный интерьер вместе с нами!
                            </b>
                        </p>
                    </div>
                    <div className="md:w-1/3 mt-4 md:mt-0">
                        <img
                            src="/team-decoro.png"
                            alt="Наша команда"
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="relative group mb-8">
                    <div>
                        {/* Длинная горизонтальная линия до */}
                        <hr className="w-full border-1 border-[#E99C28]"></hr>
                        {/* Бренды */}
                        <div className="flex flex-wrap justify-center my-10 md:my-12 mx-6 lg:mx-10">
                            <div className="mx-4 my-6 px-4 w-1/2 sm:w-1/3 lg:w-1/6 flex justify-center">
                                <Image
                                    width={132}
                                    height={37}
                                    src="/site/brands/turri-1.png"
                                    alt="TURRI"
                                    className="h-8"
                                />
                            </div>
                            <div className="mx-4 my-6 px-4 w-1/2 sm:w-1/3 lg:w-1/6 flex justify-center">
                                <Image
                                    width={243}
                                    height={42}
                                    src="/site/brands/john_richard.png"
                                    alt="JOHN-RICHARD"
                                    className="h-8"
                                />
                            </div>
                            <div className="mx-4 my-6 px-4 w-1/2 sm:w-1/3 lg:w-1/6 flex justify-center">
                                <Image
                                    width={152}
                                    height={41}
                                    src="/site/brands/longhi.png"
                                    alt="LONGHI"
                                    className="h-8"
                                />
                            </div>
                            <div className="mx-4 my-6 px-4 w-1/2 sm:w-1/3 lg:w-1/6 flex justify-center">
                                <Image
                                    width={214}
                                    height={47}
                                    src="/site/brands/misura_svg.png"
                                    alt="MisuraEmme"
                                    className="h-8"
                                />
                            </div>
                            <div className="mx-4 my-6 px-4 w-1/2 sm:w-1/3 lg:w-1/6 flex justify-center">
                                <Image
                                    width={168}
                                    height={61}
                                    src="/site/brands/aster.png"
                                    alt="Aster"
                                    className="h-8"
                                />
                            </div>
                        </div>

                        {/* Длинная горизонтальная линия после */}
                        <hr className="w-full border-1 border-[#E99C28]"></hr>
                    </div>
                </div>

                {/* Нижние карточки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-xl font-medium">
                                    Светильники TURRI со скидкой 30%
                                </h3>
                                <button className="text-sm underline mt-1">
                                    Смотреть →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/svetilniki.png"
                            alt="Светильники TURRI"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-xl font-medium">
                                    Готовые проекты спален + бесплатная
                                    установка
                                </h3>
                                <button className="text-sm underline mt-1">
                                    Смотреть →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/spalni.png"
                            alt="Готовые проекты спален"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative h-[453px]">
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-xl font-medium">
                                    Новая коллекция свечей из Италии
                                </h3>
                                <button className="text-sm underline mt-1">
                                    Смотреть →
                                </button>
                            </div>
                        </div>
                        <img
                            src="/novaya-collekciya-svechi.png"
                            alt="Новая коллекция свечей"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Форма обратной связи */}
                <div className="mb-8">
                    <h3 className="text-center text-4xl text-amber-500 font-medium mb-2">
                        Остались вопросы?
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                        Задайте их нашему менеджеру и получите ответ в течение
                        15 минут
                    </p>

                    <form className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Компания
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Телефон
                                </label>
                                <input
                                    type="tel"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">
                                Комментарий
                            </label>
                            <textarea
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div className="flex flex-col mb-4">
                            <div className="flex items-start mb-0 text-[#E99C28]">
                                <input type="checkbox" className="mt-1 mr-2" />
                                <p className="text-sm text-[#E99C28]">
                                    Политика конфиденциальности
                                </p>
                            </div>
                            <a className="text-sm py-0" href="">
                                Внимательно ознакомьтесь с нашей политикой
                                конфиденциальности
                            </a>
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-[#171613] text-white px-6 py-2 rounded hover:bg-[#E99C28] transition-colors duration-200 flex items-center cursor-pointer"
                            >
                                Отправить →
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default MainPage
