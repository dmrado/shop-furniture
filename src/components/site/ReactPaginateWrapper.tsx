'use client';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import {useEffect, useState} from "react";

const ReactPaginateWrapper = ({ pages, currentPage }) => {
    const [activePage, setActivePage] = useState(currentPage - 1)
    const router = useRouter()

//     useEffect(() => {
//         setActivePage(currentPage - 1)
//     }, [currentPage])

    console.log('pages', pages)
    console.log('currentPage', currentPage)
    const handlePageClick = (event) => {
        const newPage = event.selected + 1
        console.log('event', event)
        console.log('newPage', newPage)
        router.push(`?page=${newPage}`)
    };

    return (
        <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            forcePage={activePage}
            containerClassName={'flex justify-center gap-2 mt-8'}
            pageClassName={'px-3 py-1 rounded border hover:bg-indigo-50'}
            activeClassName={'bg-indigo-600 text-white'}
            previousClassName={'px-3 py-1 rounded border hover:bg-indigo-50'}
            nextClassName={'px-3 py-1 rounded border hover:bg-indigo-50'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
            breakClassName={'px-3 py-1'}
        />
    )
}

export default ReactPaginateWrapper
