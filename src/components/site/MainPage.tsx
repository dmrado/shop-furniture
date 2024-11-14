import React from 'react';
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
    return (
        <header className="bg-[#171613] w-[1440px] h-[121px] shadow-md">
            <div className="flex items-center px-[50px] h-full">

                <div className="flex-shrink-0">
                    <a href="">
                    <Image src={Decoro} alt="Logo" width={135} height={35} />
                    </a>
                </div>

                <nav className="flex space-x-[30px] ml-[78px]">
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

                <div className="w-px h-8 bg-[#E99C28] ml-[38px] mr-[41px]"></div>

                <div className="flex space-x-[30px] text-white">
                    <a href="/contacts" className="hover:text-[#E99C28]">Контакты</a>
                    <a href="/about" className="hover:text-[#E99C28]">О нас</a>
                    <a href="/search" className="hover:text-[#E99C28]">Поиск</a>
                </div>

                <button
                    className="ml-[50px] flex items-center justify-center text-white border border-[#E99C28] hover:bg-[#E99C28] transition-colors duration-200"
                    style={{width: 258, height: 46}}
                >
                    <Image src={Phone} width={15} height={15} className="mr-[11px]"/>
                    Заказать обратный звонок
                </button>

                <div className="flex items-center ml-[20px] space-x-[10px]">
                    <a href="/favorites">
                        <Image src={Heart} alt="Избранное" width={20} height={20}/>
                    </a>
                    <a href="/cart">
                        <Image src={Cart} alt="Корзина" width={23} height={23}/>
                    </a>
                </div>

                <div className="ml-[50px]">
                    <a href="/profile">
                        <Image src={Profile} alt="Профиль" width={24} height={24}/>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default MainPage;