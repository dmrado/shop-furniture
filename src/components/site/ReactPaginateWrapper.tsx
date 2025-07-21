'use client'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

//  опциональный пропс onPageChange. Если этот пропс передан, компонент будет использовать его для обработки смены страницы. Если нет, он вернется к поведению по умолчанию, использующему router.push.

type ReactPaginateWrapperProps = {
    pages: number; // Общее количество страниц (переименовано из totalPages для соответствия вашему коду)
    currentPage: number; // Текущая страница (1-индексированная)
    onPageChange?: (selectedPage: { selected: number }) => void; // Опциональный колбэк для внешней обработки
};

const ReactPaginateWrapper = ({ pages, currentPage, onPageChange }: ReactPaginateWrapperProps) => {

    // ReactPaginate использует 0-индексацию, поэтому currentPage - 1
    const [ activePage, setActivePage ] = useState(currentPage - 1)
    const router = useRouter()

    useEffect(() => {
        setActivePage(currentPage - 1)
    }, [ currentPage ])

    console.log('Wrapper - pages:', pages, 'currentPage:', currentPage)

    const handlePageClick = (event: { selected: number }) => {
        // Если передан колбэк onPageChange, используем его
        if (onPageChange) {
            onPageChange(event)
        } else {
            // Иначе, используем router.push (старое поведение)
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
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            forcePage={activePage} // Принудительно устанавливаем активную страницу
            containerClassName={'flex justify-center gap-2 mt-8'}
            pageClassName={'rounded border hover:bg-indigo-50'}
            pageLinkClassName={'px-3 py-1 block'}
            activeClassName={'bg-[#E99C28] text-white'}
            previousClassName={'rounded border hover:bg-indigo-50'}
            previousLinkClassName={'px-3 py-1 block'}
            nextClassName={'rounded border hover:bg-indigo-50'}
            nextLinkClassName={'px-3 py-1 block'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
            breakClassName={'px-3 py-1'}
        />
    )
}

export default ReactPaginateWrapper
