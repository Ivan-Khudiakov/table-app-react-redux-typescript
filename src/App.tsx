import React, {useEffect} from 'react'
import {Table} from "./components/Table/Table"
import {Filter} from "./components/Filter/Filter"
import {useDispatch} from "react-redux"
import {FieldType, getFilteredTable, getTable, setCurrentPage, sortTable} from "./redux/table-reducer"
import './App.css'

export const App = () => {

    const dispatch = useDispatch()

    // loading a table from a database
    useEffect(() => {
        dispatch(getTable())
    }, [])

    const sort = (field: FieldType) => {
        dispatch(sortTable(field))
    }
    const setPage = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage))
    }

    const filter = (field: FieldType, symbol: string, value: string) => {
        dispatch(getFilteredTable(field, symbol, value))
    }

    return (
    <div className="App">
        <Filter filter={filter}/>
        <Table sort={sort} setPage={setPage}/>
    </div>
  )
}


