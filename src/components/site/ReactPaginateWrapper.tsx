'use client'
import ReactPaginate from "react-paginate"
import {useState} from "react"

const ReactPaginateWrapper = ({pages}) => {
    const [activePage, setActivePage] = useState(0)

    return <ReactPaginate onPageChange={(data) => {
        setActivePage(data.selected)
    }}
                          pageCount={pages}
                          pageRangeDisplayed={10}
                          marginPagesDisplayed={3}
                          previousLabel={<span>Prev</span>}
                          nextLabel={<span>Next</span>}
                          containerClassName='pagination'
                          pageClassName='page-item'
                          pageLinkClassName='page-link'
                          activeClassName="active"
                          disabledClassName="disabled"
                          previousLinkClassName="page-link"
                          nextLinkClassName="page-link"
                          previousClassName="page-item"
                          nextClassName="page-item"
                          initialPage={activePage}
    />
}
export default ReactPaginateWrapper
