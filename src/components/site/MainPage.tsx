"use client";

import React, { useState } from "react";
import Image from "next/image";
import Decoro from "./img/Decoro.svg";
import Cart from "./img/Cart.svg";
import Profile from "./img/Profile.svg";
import ProfileY from "./img/ProfileY.svg";
import Heart from "./img/Heart.svg";
import HeartY from "./img/HeartY.svg";
import CartY from "./img/CartY.svg";
import Phone from "./img/Phone.svg";
import Search from "./img/Search.svg";
import Carousel from "@/components/site/Carousel";
import Navigation from "@/components/site/Navigation";

const MainPage = () => {
    const [heartIcon, setHeartIcon] = useState(Heart);
    const [cartIcon, setCartIcon] = useState(Cart);
    const [profileIcon, setProfileIcon] = useState(Profile);

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [menuTimer, setMenuTimer] = useState<NodeJS.Timeout | null>(null);
    const navItems = [
        { name: "Каталог", subItems: ["Мебель", "Декор", "Текстиль"] },
        { name: "Кухни", subItems: ["Модульные кухни", "Аксессуары"] },
        { name: "Свет", subItems: ["Люстры", "Торшеры", "Бра"] },
        { name: "Диваны", subItems: ["Кожаные", "Тканевые"] },
        { name: "Декор", subItems: ["Картины", "Зеркала"] },
    ];

    return (
        <div>
            <div className="flex justify-center items-center bg-[#171613]">
                <header className="bg-[#171613] shadow-md w-full max-w-[1440px]">
                    <div className="flex flex-wrap items-center px-20 py-10 gap-y-5">
                        <div className="flex-shrink-0">
                            <a href="">
                                <Image src={Decoro} alt="Logo" width={135} height={35}/>
                            </a>
                        </div>

                        <nav
                            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5 ml-4 md:ml-16 mt-0 relative">
                            {navItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => {
                                        if (menuTimer) clearTimeout(menuTimer); // Убираем таймер, если он активен
                                        setActiveMenu(item.name); // Устанавливаем активное меню
                                    }}
                                    onMouseLeave={() => {
                                        const timer = setTimeout(() => {
                                            setActiveMenu(null); // Скрываем меню через 500 мс
                                        }, 100);
                                        setMenuTimer(timer); // Сохраняем идентификатор таймера
                                    }}
                                >
                                    <a
                                        href={`/${item.name.toLowerCase()}`}
                                        className="text-white hover:text-[#E99C28] transition-colors duration-200"
                                    >
                                        {item.name}
                                    </a>
                                    {activeMenu === item.name && (
                                        <Navigation items={item.subItems}/>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className="block w-px h-8 bg-[#E99C28] ml-9 mr-10"></div>
                        <nav2
                            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5 ml-4 md:ml-16 mt-0 relative">
                            <div className="flex space-x-7 text-white">

                                <a
                                    href="/contacts"
                                    className="hover:text-[#E99C28] transition-colors duration-200"
                                >
                                    Контакты
                                </a>
                                <a
                                    href="/about"
                                    className="hover:text-[#E99C28] transition-colors duration-200"
                                >
                                    О нас
                                </a>
                                <a
                                    href="/search"
                                    className="hover:text-[#E99C28] transition-colors duration-200 flex items-center space-x-0.5"
                                >
                                    <Image src={Search} alt="Лупа" width={16} height={16}/>
                                    <span>Поиск</span>
                                </a>
                            </div>

                            <button
                                className="ml-12 flex items-center justify-center text-white border border-[#E99C28] hover:bg-[#E99C28] transition-colors duration-200"
                                style={{width: 258, height: 46}}
                            >
                                <Image src={Phone} width={15} height={15} className="mr-2.5"/>
                                <span className="text-base">Заказать обратный звонок</span>
                            </button>

                            <div className="flex items-center ml-5 space-x-2.5">
                                <a
                                    href="/favorites"
                                    onMouseEnter={() => setHeartIcon(HeartY)}
                                    onMouseLeave={() => setHeartIcon(Heart)}
                                    className="flex items-center"
                                >
                                    <Image
                                        src={heartIcon}
                                        alt="Избранное"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 transform-none"
                                    />
                                </a>
                                <a
                                    href="/cart"
                                    onMouseEnter={() => setCartIcon(CartY)}
                                    onMouseLeave={() => setCartIcon(Cart)}
                                    className="flex items-center"
                                >
                                    <Image
                                        src={cartIcon}
                                        alt="Корзина"
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 transform-none"
                                    />
                                </a>
                            </div>

                            <div className="ml-12">
                                <a
                                    href="/profile"
                                    onMouseEnter={() => setProfileIcon(ProfileY)}
                                    onMouseLeave={() => setProfileIcon(Profile)}
                                    className="flex items-center"
                                >
                                    <Image
                                        src={profileIcon}
                                        alt="Профиль"
                                        width={25}
                                        height={25}
                                        className="w-6 h-6 transform-none"
                                    />
                                </a>
                            </div>
                        </nav2>
                    </div>
                </header>
            </div>
            <main>
                <Carousel/>
            </main>
        </div>
    );
};

export default MainPage;
