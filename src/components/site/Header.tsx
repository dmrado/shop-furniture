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
import CartTotal from "@/components/cart/CartTotal";
import CartTotalAmount from "@/components/cart/CartTotalAmount";

const Header = () => {

    // if (!session || !isAdmin(session) || isSessionExpired(session)) {
    //     return redirect('/api/auth/signin')
    // }

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

    const LogoDecoro = () => {
        return <>
            <Link
                href="/"
                onClick={closeMenu}
                className=""
            >
                <Image
                    src={Decoro}
                    alt="Logo"
                    width={135}
                    height={35}
                    className=""
                />
            </Link>
        </>
    }
    const NavLeft = () => {
        return <>
            {navItems.map((item) => (
                <Link key={item.name}
                      href={`${item.name.toLowerCase()}`}
                      onClick={closeMenu}
                      className="p-4 text-white hover:text-[#E99C28] transition-colors duration-200">
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
                            <Navigation items={item.subItems} closeMenu={closeMenu}/>
                        )}
                    </div>
                </Link>
            ))}
        </>
    }

    const NavStick = () => {
        return <>
            <div className="hidden md:block w-px h-8 bg-[#E99C28] ml-9 mr-5"></div>
        </>
    }
    const NavRight = ({className}) => {
        return <>
            {/*fixme не работает отдельный отступ для первого элемента*/}
            <div className={`flex items-center text-white md:flex-row ${className}
             gap-4 [&>a:first-child]:mt-0
            sm:gap-4 sm:[&>a:first-child]:mt-0
            md:gap-5 md:[&>a:first-child]:mt-0
             `}>
                <Link
                    href="/contacts"
                    onClick={closeMenu}
                    className="hover:text-[#E99C28] transition-colors duration-200"
                >
                    Контакты
                </Link>
                <Link
                    href="/about"
                    onClick={closeMenu}
                    className="hover:text-[#E99C28] transition-colors duration-200"
                >
                    О<span className="invisible">_</span>нас
                </Link>
                <Link
                    href="/search"
                    onClick={closeMenu}
                    className="hover:text-[#E99C28] transition-colors duration-200 flex items-center space-x-0.5"
                >
                    <Image src={Search} alt="Лупа" width={16} height={16}/>
                    <span>Поиск</span>
                </Link>
            </div>

            <button
                className="my-4 flex items-center justify-center text-white border border-[#E99C28] hover:bg-[#E99C28] transition-colors duration-200"
                style={{width: 258, height: 46}}
                onClick={closeMenu}
            >
                <Image src={Phone} width={15} height={15} className="mr-2.5"/>
                {/*todo добавить функционал*/}
                <span className="text-base">Заказать обратный звонок</span>
            </button>
        </>
    }

    const NavIcons = () => {
        return <>
            <div className="flex items-center space-x-4">
                <Link
                    href="/favorites"
                    onClick={closeMenu}
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
                <NavCartTotal/>
                <Link
                    href="/cart"
                    onClick={closeMenu}
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
                    {/*todo add session*/}
                    <Link
                        href={true ? "/profile" : '/api/auth/signin'}
                        onClick={closeMenu}
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
        </>
    }

    const NavCartTotal = () => {
        return <>
            <div className="relative">
                <span className="absolute -top-12 bg-white text-yellow-700 text-md font-bold px-1.5 py-0.5 rounded-xl min-w-[20px] text-center shadow-sm z-30">
                    <CartTotalAmount/>
                </span>
            </div>
        </>
    }


    // функция закрытия мобильного меню в планшетной и мобильной версии
    const closeMenu = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false)
            setActiveMenu(null)
        }
    }

    return (
        <header className="fixed w-full h-[137px] shadow-md flex justify-center items-center bg-[#171613] z-50">
            <div className="container flex items-center mx-auto px-4 h-full">
                {/* flex-wrap для планшетов */}
                <div
                    className="flex items-center flex-wrap xl:flex-nowrap justify-between md:justify-center xl:justify-between gap-y-4">
                    {/* Первая строка */}
                    <div className="flex items-center w-full md:w-auto justify-between">
                        <div className="flex-shrink-0">
                            <LogoDecoro/>
                        </div>

                        {/* Desktop Menu 1*/}
                        <nav className="hidden md:flex gap-6">
                            <NavLeft/>
                        </nav>
                    </div>

                    <NavStick/> {/* Скрыт на мобильных */}

                    {/* NavIcons для мобильной версии вариант: вверху бургер меню*/}
                    {/*<div className="md:hidden absolute left-1/2 -translate-x-1/2">*/}
                    {/*    <NavIcons/>*/}
                    {/*</div>*/}

                    {/*/!* Desktop Menu 2*!/*/}
                    {/* Вторая строка */}
                    <div className="flex items-center w-full md:w-auto justify-between">
                        <nav2 className="hidden md:flex gap-6">
                            <NavRight/>
                            <NavIcons/>
                        </nav2>
                    </div>


                    {/* Burger Menu Button */}
                    <button
                        className="md:hidden absolute right-4"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="space-y-2">
                            <span className="block w-8 h-0.5 bg-gray-600"></span>
                            <span className="block w-8 h-0.5 bg-gray-600"></span>
                            <span className="block w-8 h-0.5 bg-gray-600"></span>
                        </div>
                    </button>

                    {/* Mobile Menu */}
                    {/*todo сделать для NavLeft-а аккордионового типа раскрытие-акрытие по onClick*/}
                    {isOpen && (
                        <div className="absolute top-[137px] left-0 w-full shadow-md md:hidden bg-[#171613]">
                            <nav className="flex flex-col items-center">
                                <NavIcons className="flex justify-center"/>
                                <NavLeft/>
                                <NavRight className="flex flex-col items-center space-y-4 mt-4 gap-3"/>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header

const NavSocials = () => {
    return <>
        <div className="menu" id="menu">
            <ul className="flex items-center list-none p-0 m-0 absolute -translate-y-[110%] gap-1.5">
                <li className="flex justify-center items-center m-0 mr-0 bg-white w-[47px] h-[47px] rounded-full">
                    <Link className="flex justify-center items-center m-0 menu__link mr-5" target="_blank"
                          href="https://t.me/+79146520955">
                        {/*<i className="fa-brands fa-telegram" />*/}

                    </Link>
                </li>
                <li className="mr-0 bg-white w-[47px] h-[47px] rounded-full">
                    <Link className="menu__link" target="_blank"
                          href="https://api.whatsapp.com/send/?phone=79242693005">
                        {/*<i className="fa-brands fa-square-whatsapp" />*/}
                    </Link>
                </li>
                <li className="mr-0 bg-white w-[47px] h-[47px] rounded-full">
                    <Link className="menu__link" target="_blank"
                          href="https://www.youtube.com/@Stranger-pilgrim">
                        {/*<i className="fa-brands fa-square-youtube"></i>*/}
                    </Link>
                </li>
            </ul>
        </div>
    </>
}