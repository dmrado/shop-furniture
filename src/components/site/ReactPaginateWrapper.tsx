'use client'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

//  опциональный пропс onPageChange. Если этот пропс передан, компонент будет использовать его для обработки смены страницы. Если нет, он вернется к поведению по умолчанию, использующему router.push.

type ReactPaginateWrapperProps = {
    pages: number // Общее количество страниц (переименовано из totalPages для соответствия вашему коду)
    currentPage: number // Текущая страница (1-индексированная)
    onPageChange?: (selectedPage: { selected: number }) => void // Опциональный колбэк для внешней обработки
}

const ReactPaginateWrapper = ({
    pages,
    currentPage,
    onPageChange
}: ReactPaginateWrapperProps) => {
    // ReactPaginate использует 0-индексацию, поэтому currentPage - 1
    const [activePage, setActivePage] = useState(currentPage - 1)
    const router = useRouter()
    // Состояние для количества страниц, отображаемых в диапазоне
    const [pageRange, setPageRange] = useState(5)
    // Состояние для количества страниц, отображаемых по краям
    const [marginPages, setMarginPages] = useState(2)

    useEffect(() => {
        setActivePage(currentPage - 1)

        // Добавляем слушатель изменения размера окна
        const handleResize = () => {
            // Если ширина экрана меньше 640px (мобильные устройства)
            if (window.innerWidth < 640) {
                setPageRange(1) // Показываем только текущую страницу
                setMarginPages(2) // по две по краям
            } else {
                setPageRange(5) // Для больших экранов
                setMarginPages(3)
            }
        }

        // Устанавливаем начальные значения при монтировании
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [currentPage]) // currentPage добавлено в зависимости, чтобы пересчитывать activePage

    console.log('Wrapper - pages:', pages, 'currentPage:', currentPage)

    const handlePageClick = (event: { selected: number }) => {
        if (onPageChange) {
            onPageChange(event)
        } else {
            const newPage = event.selected + 1
            console.log('Wrapper - router.push to page:', newPage)
            router.push(`?page=${newPage}`)
        }
    }
    return (
        <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            pageCount={pages}
            marginPagesDisplayed={marginPages}
            pageRangeDisplayed={pageRange}
            onPageChange={handlePageClick}
            forcePage={activePage} // Принудительно устанавливаем активную страницу
            containerClassName={
                'flex justify-center gap-1 sm:gap-2 mt-8 px-2 sm:px-0'
            } // Уменьшаем gap и добавляем горизонтальный padding
            pageClassName={
                'rounded border hover:bg-indigo-50 text-sm sm:text-base'
            } // Уменьшаем размер текста на мобильных
            pageLinkClassName={'px-2 py-1 block'} // Уменьшаем padding на мобильных
            activeClassName={'bg-[#E99C28] text-white'}
            previousClassName={
                'rounded border hover:bg-indigo-50 text-sm sm:text-base'
            } // Уменьшаем размер текста
            previousLinkClassName={'px-2 py-1 block'} // Уменьшаем padding
            nextClassName={
                'rounded border hover:bg-indigo-50 text-sm sm:text-base'
            } // Уменьшаем размер текста
            nextLinkClassName={'px-2 py-1 block'} // Уменьшаем padding
            disabledClassName={'opacity-50 cursor-not-allowed'}
            breakClassName={'px-2 py-1 text-sm sm:text-base'} // Уменьшаем padding и размер текста
        />
    )
}

export default ReactPaginateWrapper
