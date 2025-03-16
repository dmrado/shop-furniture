'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Heart from '@/components/site/img/Heart.svg'
import Cart from '@/components/site/img/Cart.svg'
import Profile from '@/components/site/img/Profile.svg'
import Image from 'next/image'
import Decoro from '@/components/site/img/Decoro.svg'
import Search from '@/components/site/img/Search.svg'
import Phone from '@/components/site/img/Phone.svg'
import HeartY from '@/components/site/img/HeartY.svg'
import CartY from '@/components/site/img/CartY.svg'
import ProfileY from '@/components/site/img/ProfileY.svg'
import CartTotal from '@/components/cart/CartTotal'
import CartTotalAmount from '@/components/cart/CartTotalAmount'
import { getServerSession } from 'next-auth'
import { isSessionExpired } from '@/actions/isSessionExpired'
import { redirect } from 'next/navigation'

const Header = () => {

    // для мобильного меню
    const [ isOpen, setIsOpen ] = useState(false)

    // для изменения поведения svg-иконок
    const [ heartIcon, setHeartIcon ] = useState(Heart)
    const [ cartIcon, setCartIcon ] = useState(Cart)
    const [ profileIcon, setProfileIcon ] = useState(Profile)

    // для подменю в десктопном меню
    const [ activeMenu, setActiveMenu ] = useState<string | null>(null)
    const [ menuTimer, setMenuTimer ] = useState<NodeJS.Timeout | null>(null)

    // для аккордеона в мобильном меню
    const [ activeMenuItem, setActiveMenuItem ] = useState<string | null>(null)
    const [ hoveredItem, setHoveredItem ] = useState<string | null>(null)

    const [ session, setSession ] = useState(null)

    // useEffect(() => {
    //     const handleSession = async () => {
    //         const session = await getServerSession()
    //         if (!session || isSessionExpired(session)) {
    //             setSession(null)
    //         }
    //         setSession(session)
    //     }
    //     handleSession()
    // }, [])

    // todo переделать ссылки на реальные
    const navItems = [
        { name: 'Каталог', subItems: [ 'Мебель', 'Декор', 'Текстиль' ] },
        { name: 'Кухни', subItems: [ 'Модульные кухни', 'Аксессуары' ] },
        { name: 'Свет', subItems: [ 'Люстры', 'Торшеры', 'Бра' ] },
        { name: 'Диваны', subItems: [ 'Кожаные', 'Тканевые' ] },
        { name: 'Декор', subItems: [ 'Картины', 'Зеркала' ] },
    ]

    // todo сделать функцию закрытия по клику вне выпадающего меню
    // функция закрытия мобильного меню в планшетной и мобильной версии
    const closeMenu = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false)
            setActiveMenu(null)
        }
    }

    // функция для аккордеона в мобильном меню
    const handleMenuClick = (itemName: string) => {
        setActiveMenuItem(activeMenuItem === itemName ? null : itemName)
    }
    const handleMouseEnter = (itemName: string) => {
        setHoveredItem(itemName)
    }

    const handleMouseLeave = () => {
        setHoveredItem(null)
    }

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

    interface NavItem {
        name: string;
        subItems: string[];
    }

    const NavLeft = () => {
        return <>
            {/* Десктопное меню */}
            <nav className="hidden md:flex ml-4">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href="#"
                        className="relative group"
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="p-3 text-white hover:text-[#E99C28] transition-colors duration-200">
                            {item.name}
                        </span>
                        {hoveredItem === item.name && (
                            <div
                                className="absolute left-0 mt-0 w-48 bg-[#222] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {item.subItems.map((subItem) => (
                                    <Link
                                        key={subItem}
                                        href={`/${subItem.toLowerCase()}`}
                                        className="block p-4 text-white hover:text-[#E99C28]"
                                    >
                                        {subItem}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Мобильное меню */}
            <nav className="md:hidden text-center">
                {navItems.map((item) => (
                    <div key={item.name} className="w-full">
                        <Link
                            href="#"
                            onClick={() => handleMenuClick(item.name)}
                            className="block w-full p-3 text-white hover:text-[#E99C28] transition-colors duration-200 text-center"
                        >
                            {item.name}
                        </Link>
                        {activeMenuItem === item.name && (
                            <div className="py-1.5 bg-[#222] text-white">
                                {item.subItems.map((subItem) => (
                                    <Link
                                        key={subItem}
                                        href={`/${subItem.toLowerCase()}`}
                                        onClick={closeMenu}
                                        className="block py-2 hover:text-[#E99C28]"
                                    >
                                        {subItem}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </>
    }

    const NavStick = () => {
        return <>
            <div className="hidden md:block w-px h-8 bg-[#E99C28] ml-9 mr-10"></div>
        </>
    }
    const NavRight = () => {
        return <>
            {/*fixme не работает отдельный отступ для первого элемента*/}
            <div className={`flex items-center text-white md:flex-row flex-col
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
                className="my-4 flex items-center justify-center text-white border border-[#E99C28] hover:bg-[#E99C28] transition-colors duration-200 cursor-pointer"
                style={{ width: 258, height: 46 }}
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

                <Link
                    href="/cart"
                    onClick={closeMenu}
                    onMouseEnter={() => setCartIcon(CartY)}
                    onMouseLeave={() => setCartIcon(Cart)}
                    className="flex items-center relative"
                >
                    <NavCartTotal/>
                    <Image
                        src={cartIcon}
                        alt="Корзина"
                        width={24}
                        height={24}
                        className="w-6 h-6 transform-none"
                    />
                </Link>

                <div className="ml-12">
                    {!session &&
                        <Link
                            href={'/api/auth/signin'}
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
                        </Link>}
                    {session &&
                        <Link
                            href={'/profile'}
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
                        </Link>}
                </div>
            </div>
        </>
    }

    const NavCartTotal = () => {
        return <>
            <div className="absolute left-1/2 -top-8 -translate-x-1/2">
                <span
                    className="bg-white text-yellow-700 text-md font-bold px-1.5 py-0.5 rounded-xl min-w-[20px] text-center shadow-sm z-30">
                    <CartTotalAmount/>
                </span>
            </div>
        </>
    }

    return (
        <header className="fixed w-full h-[137px] shadow-md flex justify-center items-center bg-[#171613] z-50">
            <div className="flex items-center h-full">
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
                    {isOpen && (
                        <div
                            className="flex flex-col items-center absolute top-[137px] left-0 w-full shadow-md md:hidden bg-[#171613]">
                            <NavIcons/>
                            <NavLeft/>
                            <NavRight/>
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