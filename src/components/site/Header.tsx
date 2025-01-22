'use client'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Decoro from "@/components/site/img/Decoro.svg";
import Heart from "@/components/site/img/Heart.svg";
import Cart from "@/components/site/img/Cart.svg";
import Profile from "@/components/site/img/Profile.svg";
import Navigation from "@/components/site/Navigation";

const Header = () => {
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
    //useEffect-ы для адаптивности меню навигации
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.querySelector('.header')
            const burger = document.getElementById('burger')

            burger?.addEventListener('click', () => {
                // if (header.classList !== 'open') {
                header?.classList.add('open')
                // } else return
            })

            //скрыть при нажатии на пункт меню
            document.querySelectorAll('.menu__link').forEach(item => item.addEventListener('click', () => {
                header?.classList.remove('open')
            }))

            //  Закрыть по esc
            window.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    header?.classList.remove('open')
                }
            })

            //  Закрыть при клике вне его
            // @ts-ignore
            document.getElementById('menu').addEventListener('click', e => {
                e._isClickWithInMenu = true
            })
            burger?.addEventListener('click', e => {
                e._isClickWithInMenu = true
            })
            //то есть если кликнули по меню или бургеру - ничего не выполняем
            document.body.addEventListener('click', e => {
                if (e._isClickWithInMenu) return
                document.querySelector('.header')?.classList.remove('open')
            })
        }

    }, [])
    // const [isOpen, setIsOpen] = useState(false);
    return (<>
            {/* Для header.open .menu */}
            {/*<div className={${isOpen ? '-translate-x-full visible' : ''}}>*/}
                {/* содержимое меню */}
            {/*</div>*/}
            {/*header-block*/}
            {/*<div className="body-wrapper">*/}
            {/* body-wrapper нужен в AboutPage для меню навигации справа в режиме телефона */}
            {/*header нужен именно здесь, здесь для него useEffect*/}
            <div className="bg-[#171613] shadow-md w-full max-w-[1440px]" style={{marginBottom: '90px'}}>
                {/*header__container -  nav*/}
                <nav
                    className="flex justify-between items-center h-[90px] min-w-full fixed top-0 left-0 right-0 bg-[#171613] px-[120px] py-[15px] transition-all duration-700 z-[25]
                    {/*text-[#004E98]*/}
                    ">
                    <div className="flex-shrink-0">
                        <a href="">
                            <Image src={Decoro} alt="Logo" width={135} height={35}/>
                        </a>
                    </div>
                    <button
                        className="hidden relative w-[40px] h-[40px] bg-transparent border-none outline-none transition-all duration-700 z-2"
                        id="burger">
                        <span
                            className="block absolute w-[30px] h-[3px] left-[5px] will-change-transform cursor-pointer"/>
                        <span
                            className="block absolute w-[30px] h-[3px] left-[5px] will-change-transform cursor-pointer"/>
                        <span
                            className="block absolute w-[30px] h-[3px] left-[5px] will-change-transform cursor-pointer"/>
                    </button>

                    <div className="menu" id="menu">
                        <ul className="flex items-center list-none p-0 m-0">
                            <li className="mr-5 last:mr-0">
                                {navItems.map((item) => (
                                    <li key={item.name} className="mr-5 last:mr-0">
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
                                        >
                                            <Link
                                                className="inline-block text-lg font-normal text-[#004E98] ml-0 transition-all duration-100 ease-in uppercase hover:text-[#FF6700] hover:drop-shadow-[5px_5px_50px_#01213f] focus:text-xl focus:shadow-none focus:shadow-[#01213f]"
                                                href={`${item.name.toLowerCase()}`}
                                                    >
                                                    {item.name}
                                                    </Link>
                                                {activeMenu === item.name && (
                                                    <Navigation items={item.subItems} />
                                            )}
                                        </div>
                                    </li>
                                    ))}
                            </li>

                        </ul>
                    </div>

                    <div>
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
                    </div>
                </nav>
            </div>
            {/*</div>*/}
        </>
    )
}

export default Header
