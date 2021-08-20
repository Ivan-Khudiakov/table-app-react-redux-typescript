import React from "react"
import { Link } from "react-router-dom"
import "./Paginator.css"

type PropsPaginatorType ={
    pageSize: number
    totalCount: number
    currentPage: number
    setPage: (page: number) => void
}

export const Paginator: React.FC<PropsPaginatorType> = React.memo((
    {pageSize, totalCount, currentPage, setPage}) => {

    const paginate = (pageNumber: number) => {
        setPage(pageNumber)
    }

    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className="paginatorContainer">
            <ul className="pagination">
                {
                    pages.map(num => (
                        <li key={num}>
                            <Link className={ num === currentPage ? "active" : ""} to={num+""} onClick={() => paginate(num)}>{num}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})
