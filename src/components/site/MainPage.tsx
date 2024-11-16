"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Decoro from './img/Decoro.svg';
import Cart from './img/Cart.svg';
import Profile from './img/Profile.svg';
import ProfileY from './img/ProfileY.svg';
import Heart from './img/Heart.svg';
import HeartY from './img/HeartY.svg';
import CartY from './img/CartY.svg';
import Phone from './img/Phone.svg';
import Search from './img/Search.svg';

const MainPage = () => {
    // Состояния для смены иконок
    const [heartIcon, setHeartIcon] = useState(Heart);
    const [cartIcon, setCartIcon] = useState(Cart);
    const [profileIcon, setProfileIcon] = useState(Profile);

    return (
        <div className="flex justify-center items-center bg-[#171613]">
            <header className="bg-[#171613] shadow-md w-full max-w-[1440px]">
                <div className="flex flex-wrap items-center px-[20px] lg:px-[50px] py-[10px] lg:py-[40px] gap-y-[20px]">

                    {/* Логотип */}
                    <div className="flex-shrink-0">
                        <a href="">
                            <Image src={Decoro} alt="Logo" width={135} height={35} />
                        </a>
                    </div>

                    {/* Навигация */}
                    <nav className="flex space-x-[20px] lg:space-x-[30px] mt-[10px] lg:mt-0 lg:ml-[78px]">
                        {["Каталог", "Кухни", "Свет", "Диваны", "Декор"].map((item) => (
                            <a
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-white hover:text-[#E99C28] transition-colors duration-200 text-sm lg:text-base"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden lg:block w-px h-8 bg-[#E99C28] lg:ml-[38px] lg:mr-[41px]"></div>

                    {/* Ссылки */}
                    <div className="flex space-x-[15px] lg:space-x-[28px] text-white mt-[10px] lg:mt-0">
                        <a href="/contacts" className="hover:text-[#E99C28] transition-colors duration-200 text-sm lg:text-base">Контакты</a>
                        <a href="/about" className="hover:text-[#E99C28] transition-colors duration-200 text-sm lg:text-base">О нас</a>
                        <a href="/search" className="hover:text-[#E99C28] transition-colors duration-200 flex items-center space-x-[2px]">
                            <Image src={Search} alt="Лупа" width={16} height={16} />
                            <span className="text-sm lg:text-base">Поиск</span>
                        </a>
                    </div>

                    {/* Кнопка */}
                    <button
                        className="ml-[20px] lg:ml-[50px] flex items-center justify-center text-white border border-[#E99C28] hover:bg-[#E99C28] transition-colors duration-200 mt-[10px] lg:mt-0"
                        style={{ width: 258, height: 46 }}
                    >
                        <Image src={Phone} width={15} height={15} className="mr-[11px]" />
                        <span className="text-sm lg:text-base">Заказать обратный звонок</span>
                    </button>

                    {/* Иконки */}
                    <div className="flex items-center ml-[10px] lg:ml-[20px] space-x-[10px] mt-[10px] lg:mt-0">
                        <a
                            href="/favorites"
                            onMouseEnter={() => setHeartIcon(HeartY)}
                            onMouseLeave={() => setHeartIcon(Heart)}
                        >
                            <Image src={heartIcon} alt="Избранное" width={20} height={20} />
                        </a>
                        <a
                            href="/cart"
                            onMouseEnter={() => setCartIcon(CartY)}
                            onMouseLeave={() => setCartIcon(Cart)}
                        >
                            <Image src={cartIcon} alt="Корзина" width={23} height={23} />
                        </a>
                    </div>

                    <div className="ml-[20px] lg:ml-[50px] mt-[10px] lg:mt-0">
                        <a
                            href="/profile"
                            onMouseEnter={() => setProfileIcon(ProfileY)}
                            onMouseLeave={() => setProfileIcon(Profile)}
                        >
                            <Image src={profileIcon} alt="Профиль" width={24} height={24} />
                        </a>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default MainPage;
