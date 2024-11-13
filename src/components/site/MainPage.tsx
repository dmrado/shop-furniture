import React from 'react'
import Image from "next/image";
import Decoro from './img/Decoro.svg'

const MainPage = () => {
    return (
        <div className="grid flex-col ">
            <header className="grid flex-row items-center content-around">

                <div className="">
                    <Image src={Decoro} alt="" width="135" height="35"/>
                </div>

                <div className="">
                    Navigation bar
                </div>

                <div className="">
                    Call Heart Cart
                </div>

                <div className="">
                    Profile
                </div>

            </header>
        </div>
    )
}

export default MainPage