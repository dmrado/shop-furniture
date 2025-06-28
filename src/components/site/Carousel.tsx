'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Arrow } from '@/components/site/img/Arrow'
import sampleImage from '@/components/site/img/sample-carousel.svg'
import sampleImage2 from '@/components/site/img/sample-carousel2.webp'
import sampleImage3 from '@/components/site/img/sample-carousel3.jpg'
import Link from 'next/link'

const Carousel = () => {
    const images = [ sampleImage, sampleImage2, sampleImage3 ]
    const [ currentImageIndex, setCurrentImageIndex ] = useState(0)
    const [ nextImageIndex, setNextImageIndex ] = useState(1)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const [ isAnimate, setIsAnimate ] = useState(false)

    // Функция для смены изображения
    const changeImage = (index: number) => {

        setIsAnimate(true) //NextImage "opacity-100", CurrentImage "opacity-0"

        setTimeout(() => {
            setNextImageIndex(index)// Устанавливаем следующий индекс
            setCurrentImageIndex(index) // Обновляем изображение после анимации
            setNextImageIndex((index + 1) % images.length)

        }, 500)
        setIsAnimate(false)

    }

    // Автоматическая смена изображения Если индекс меньше длины массива, получаем сам индекс
    useEffect(() => {
        const cycleImages = () => {
            const nextIndex = (currentImageIndex + 1) % images.length
            changeImage(nextIndex)
        }

        // Устанавливаем интервал
        timerRef.current = setInterval(cycleImages, 4000)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current) // Очистка таймера при размонтировании
        }
    }, [ currentImageIndex, images.length ])

    // Сброс таймера при ручной смене изображения
    const handleManualChange = (index: number) => {
        if (timerRef.current) clearInterval(timerRef.current) // Сбрасываем таймер
        changeImage(index) // Меняем изображение
    }

    return (
        <div className="relative w-full h-[700px] overflow-hidden">
            {/* Текущая картинка */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${
                    isAnimate ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <Image
                    src={images[currentImageIndex]}
                    alt={`Карусель ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>

            {/* Следующая картинка */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${
                    isAnimate ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Image
                    src={images[nextImageIndex]}
                    alt={`Карусель ${nextImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>

            {/* Полупрозрачная плашка */}
            <div
                className="absolute left-[68px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-8 max-w-[589px] h-[265px]">
                <h1 className="text-4xl mb-4 font-semibold mt-7">
                    Новая коллекция диванов <br/>
                    со скидкой 10%
                </h1>
                <Link href='/products'>
                    <button className="flex items-center px-4 py-5 bg-[#171613] transition-all duration-200 mt-5">
                        Подробнее
                        <Arrow
                            width={16}
                            height={16}
                            className="ml-2.5 mt-1.5"
                        />
                    </button>
                </Link>

            </div>

            {/* Точки навигации */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleManualChange(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentImageIndex === index
                                ? 'bg-[#232E26]'
                                : 'bg-white opacity-50'
                        } transition-opacity duration-200`}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default Carousel
