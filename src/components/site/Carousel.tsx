import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Arrow from "@/components/site/img/Arrow.svg";
import sampleImage from "@/components/site/img/sample-carousel.svg";
import sampleImage2 from "@/components/site/img/sample-carousel2.webp";
import sampleImage3 from "@/components/site/img/sample-carousel3.jpg";

const Carousel: React.FC = () => {
    const images = [sampleImage, sampleImage2, sampleImage3, sampleImage];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false); // Для управления анимацией
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Функция для смены изображения
    const changeImage = (index: number) => {
        setIsAnimating(true); // Начинаем анимацию
        setTimeout(() => {
            setCurrentImageIndex(index); // Обновляем изображение после анимации
            setIsAnimating(false); // Снимаем флаг анимации
        }, 500); // Длительность анимации
    };

    // Автоматическая смена изображения
    useEffect(() => {
        const cycleImages = () => {
            const nextIndex = (currentImageIndex + 1) % images.length;
            changeImage(nextIndex);
        };

        // Устанавливаем интервал
        timerRef.current = setInterval(cycleImages, 4000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current); // Очистка таймера при размонтировании
        };
    }, [currentImageIndex, images.length]);

    // Сброс таймера при ручной смене изображения
    const handleManualChange = (index: number) => {
        if (timerRef.current) clearInterval(timerRef.current); // Сбрасываем таймер
        changeImage(index); // Меняем изображение
    };

    return (
        <div className="relative w-full h-[700px] overflow-hidden">
            {/* Текущая картинка */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                    isAnimating ? "opacity-0" : "opacity-100"
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

            {/* Полупрозрачная плашка */}
            <div className="absolute left-[68px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-8 max-w-[589px] h-[265px]">
                <h1 className="text-4xl mb-4 font-semibold mt-7">
                    Новая коллекция диванов <br />
                    со скидкой 10%
                </h1>
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
                        onClick={() => handleManualChange(index)}
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

export default Carousel;
