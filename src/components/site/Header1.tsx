// components/Header.tsx
'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Navigation from "@/components/site/Navigation";
import Heart from "@/components/site/img/Heart.svg";
import Cart from "@/components/site/img/Cart.svg";
import Profile from "@/components/site/img/Profile.svg";
import Image from "next/image";
import Decoro from "@/components/site/img/Decoro.svg";
import Search from "@/components/site/img/Search.svg";
import Phone from "@/components/site/img/Phone.svg";
import HeartY from "@/components/site/img/HeartY.svg";
import CartY from "@/components/site/img/CartY.svg";
import ProfileY from "@/components/site/img/ProfileY.svg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [heartIcon, setHeartIcon] = useState(Heart);
    const [cartIcon, setCartIcon] = useState(Cart);
    const [profileIcon, setProfileIcon] = useState(Profile);

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [menuTimer, setMenuTimer] = useState<NodeJS.Timeout | null>(null);
    const navItems = [
        {name: "Каталог", subItems: ["Мебель", "Декор", "Текстиль"]},
        {name: "Кухни", subItems: ["Модульные кухни", "Аксессуары"]},
        {name: "Свет", subItems: ["Люстры", "Торшеры", "Бра"]},
        {name: "Диваны", subItems: ["Кожаные", "Тканевые"]},
        {name: "Декор", subItems: ["Картины", "Зеркала"]},
    ];

    const menuItems = [
        {title: 'Главная', href: '/'},
        {title: 'О нас', href: '/about'},
        {title: 'Услуги', href: '/services'},
        {title: 'Проекты', href: '/projects'},
        {title: 'Блог', href: '/blog'},
        {title: 'Контакты', href: '/contacts'},
        {title: 'Цены', href: '/prices'},
    ]

    return (
        <header className="fixed w-full h-[137px] shadow-md flex justify-center items-center bg-[#171613] z-50">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex-shrink-0">
                    <a href="">
                        <Image src={Decoro} alt="Logo" width={135} height={35}/>
                    </a>
                </div>

                {/* Desktop Menu 1*/}
                <nav className="hidden md:flex gap-6">
                    {navItems.map((item) => (
                        <Link key={item.name} href={`${item.name.toLowerCase()}`}
                              className="text-white hover:text-[#E99C28] transition-colors duration-200">
                            <div
                                className="relative"
                                onMouseEnter={() => {
                                    if (menuTimer) clearTimeout(menuTimer);
                                    setActiveMenu(item.name);
                                }}
                                onMouseLeave={() => {
                                    const timer = setTimeout(() => {
                                        setActiveMenu(null);
                                    }, 100);
                                    setMenuTimer(timer);
                                }}
                            >{item.name}
                                {activeMenu === item.name && (
                                    <Navigation items={item.subItems}/>
                                )}
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="block w-px h-8 bg-[#E99C28] ml-9 mr-10"></div>

                {/*/!* Desktop Menu 2*!/*/}
                <nav2 className="hidden md:flex gap-6">
                    <div className="flex items-center space-x-7 text-white">
                        <Link
                            href="/contacts"
                            className="hover:text-[#E99C28] transition-colors duration-200"
                        >
                            Контакты
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-[#E99C28] transition-colors duration-200"
                        >
                            О нас
                        </Link>
                        <Link
                            href="/search"
                            className="hover:text-[#E99C28] transition-colors duration-200 flex items-center space-x-0.5"
                        >
                            <Image src={Search} alt="Лупа" width={16} height={16}/>
                            <span>Поиск</span>
                        </Link>
                    </div>

                    <button
                        className="ml-12 flex items-center justify-center text-white border border-[#E99C28] hover:bg-[#E99C28] transition-colors duration-200"
                        style={{width: 258, height: 46}}
                    >
                        <Image src={Phone} width={15} height={15} className="mr-2.5"/>
                        <span className="text-base">Заказать обратный звонок</span>
                    </button>

                    <div className="flex items-center space-x-2.5">
                        <Link
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
                        </Link>
                        <Link
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
                        </Link>


                        <div className="ml-12">
                            <Link
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
                            </Link>
                        </div>
                    </div>
                </nav2>


                {/* Burger Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="space-y-2">
                        <span className="block w-8 h-0.5 bg-gray-600"></span>
                        <span className="block w-8 h-0.5 bg-gray-600"></span>
                        <span className="block w-8 h-0.5 bg-gray-600"></span>
                    </div>
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-[137px] left-0 w-full shadow-md md:hidden  bg-[#171613]">
                        <nav className="flex flex-col">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="p-4 text-white hover:text-[#E99C28] transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
