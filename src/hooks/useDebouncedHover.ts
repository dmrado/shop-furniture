import { useState, useCallback, useRef, useEffect } from 'react'

// Вспомогательная функция debounce (та же, что и раньше)
function debounce(func, delay) {
    let timeoutId
    return function(...args) {
        const context = this
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func.apply(context, args), delay)
    }
}

export function useDebouncedHover(initialState = false, delay = 100) {
    const [ isHovered, setIsHovered ] = useState(initialState)

    // useRef для сохранения debounced функций между рендерами
    const debouncedSetHoveredTrueRef = useRef(
        debounce(() => setIsHovered(true), delay)
    )
    const debouncedSetHoveredFalseRef = useRef(
        debounce(() => setIsHovered(false), delay)
    )

    // Мемоизированные колбэки для onMouseEnter и onMouseLeave
    const handleMouseEnter = useCallback(() => {
        debouncedSetHoveredTrueRef.current()
    }, []) // Зависимостей нет, так как debounced функция уже useRef

    const handleMouseLeave = useCallback(() => {
        debouncedSetHoveredFalseRef.current()
    }, []) // Зависимостей нет

    // Очистка таймеров при размонтировании компонента (важно для долгоживущих компонентов)
    useEffect(() => {
        return () => {
            // Если вы используете debounce из библиотеки, у них часто есть метод "cancel"
            // Для нашей реализации это не строго необходимо, т.к. setIsHovered будет NOOP на unmounted component
            // Но для сложных debounced-функций с side-эффектами это важно.
            // Например, если бы мы делали fetch запрос внутри debounce,
            // здесь нужно было бы его отменять.
        }
    }, [])

    return {
        isHovered,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    }
}