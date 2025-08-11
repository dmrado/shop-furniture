import React from 'react'

interface ArrowProps {
    width?: number | string; // Optional: можно задать как число, так и строку (например, "1em")
    height?: number | string;
    className?: string; // Для классов Tailwind
    fill?: string; // Если хотите менять цвет стрелки через пропс
}

export const Arrow: React.FC<ArrowProps> = ({ width = 16, height = 6, className = '', fill = 'white' }) => {
    // Устанавливаем значения по умолчанию, если пропсы не переданы
    return (
        <svg
            width={width} // Передаем пропс width
            height={height} // Передаем пропс height
            viewBox="0 0 16 6"
            // fill="none" // Это убираем, так как fill будет на path
            xmlns="http://www.w3.org/2000/svg"
            className={className} // Передаем пропс className
        >
            <path
                d="M1 2.5C0.723858 2.5 0.5 2.72386 0.5 3C0.5 3.27614 0.723858 3.5 1 3.5V2.5ZM16 3L11 0.113249V5.88675L16 3ZM1 3.5H11.5V2.5H1V3.5Z"
                fill={fill} // Используем пропс fill
            />
        </svg>
    )
}