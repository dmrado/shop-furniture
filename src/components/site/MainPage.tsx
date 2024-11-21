"use client";

import React, { useState } from "react";
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
import Arrow from './img/Arrow.svg';
import sampleImage from "./img/sample-carousel.svg";

const MainPage = () => {
    const [heartIcon, setHeartIcon] = useState(Heart);
    const [cartIcon, setCartIcon] = useState(Cart);
    const [profileIcon, setProfileIcon] = useState(Profile);

    const images = [sampleImage, sampleImage, sampleImage, sampleImage];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const Carousel: React.FC = () => {
        return (
            <div className="relative w-full h-[700px]">
                {/* Картинка текущей карусели */}
                <Image
                    src={images[currentImageIndex]}
                    alt={`Карусель ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />

                {/* Полупрозрачная плашка */}
                <div className="absolute left-[68px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-8 max-w-[589px] h-[265px]">
                    <h1 className="text-4xl mb-4 font-semibold mt-7">Новая коллекция диванов <br />со скидкой 10%</h1>
                    <button className="flex items-center px-4 py-5 bg-[#171613] transition-all duration-200 mt-5">
                        Подробнее
                        <Image src={Arrow} className="ml-2.5 mt-1" />
                    </button>
                </div>

                {/* Точки навигации */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                                currentImageIndex === index
                                    ? "bg-[#232E26]"
                                    : "bg-white opacity-50"
                            } transition-opacity duration-200`}
                        ></button>
                    ))}
                </div>
            </div>
        );
    };

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

                        <nav className="flex space-x-5 ml-16 mt-0">
                            {["Каталог", "Кухни", "Свет", "Диваны", "Декор"].map((item) => (
                                <a
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="text-white hover:text-[#E99C28] transition-colors duration-200"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <div className="block w-px h-8 bg-[#E99C28] ml-9 mr-10"></div>

                        <div className="flex space-x-7 text-white">
                            <a href="/contacts"
                               className="hover:text-[#E99C28] transition-colors duration-200">Контакты</a>
                            <a href="/about" className="hover:text-[#E99C28] transition-colors duration-200">О нас</a>
                            <a href="/search"
                               className="hover:text-[#E99C28] transition-colors duration-200 flex items-center space-x-0.5">
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
