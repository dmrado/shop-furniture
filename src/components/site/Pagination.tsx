'use client'
import React from 'react'

const Pagination = ({activePage, setActivePage, pages}) => {
    return <nav aria-label="Page navigation example">
        <ul className="">
            <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                    <li className={`page-item ${(activePage <= 1) ? 'disabled' : ''}`}>
                        <a onClick={() => {
                            if (activePage <= 1) {
                                return
                            }
                            setActivePage(activePage - 1)
                        }} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                           href="#">Назад
                        </a>
                    </li>

                    <li className="page-item"><span className="page-link">{activePage} / {pages}</span></li>

                    {/*<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">*/}
                    {/*    1*/}
                    {/*</button>*/}
                    {/*<button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">*/}
                    {/*    2*/}
                    {/*</button>*/}
                    {/*<button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">*/}
                    {/*    3*/}
                    {/*</button>*/}

                    <li className={`page-item ${(activePage >= pages) ? 'disabled' : ''}`}>
                        <a onClick={() => {
                            if (activePage >= pages) {
                                return
                            }
                            setActivePage(activePage + 1)
                        }} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                           href="#">Вперед
                        </a>
                    </li>
                </div>
            </div>
        </ul>
    </nav>
}
export default Pagination