import React, {useMemo} from 'react'
import {FieldType, TableType} from "../../redux/table-reducer"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store"
import {Paginator} from "../../common/Paginator/Paginator"
import {arrayPartialSelector} from "../../redux/selectors"
import './Table.css'

type PropsType = {
    sort: (field: FieldType) => void
    setPage: (currentPage: number) => void
}

export const Table: React.FC<PropsType> = ({sort, setPage}) => {

    const tableData = useSelector<AppRootStateType, TableType>(state => state.table.table)
    const pageSize = useSelector<AppRootStateType, number>(state => state.table.pageSize)
    const currentPage = useSelector<AppRootStateType, number>(state => state.table.currentPage)

    const current = useMemo(() =>
            arrayPartialSelector(tableData, currentPage, pageSize),
        [tableData, currentPage, pageSize]
    )

    const sortTableByName = () => {
        sort("name")
    }
    const sortTableByQuantity = () => {
        sort("quantity")
    }
    const sortTableByDistance = () => {
        sort("distance")
    }

    return (
        <>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th onClick={sortTableByName}>Название</th>
                        <th onClick={sortTableByQuantity}>Количество</th>
                        <th onClick={sortTableByDistance}>Расстояние, км</th>
                    </tr>
                    </thead>
                    <tbody>
                    {current.map(t => {
                        return (
                            <tr key={t.id}>
                                <td>{t.date}</td>
                                <td>{t.name}</td>
                                <td>{t.quantity}</td>
                                <td>{t.distance}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Paginator pageSize={pageSize} currentPage={currentPage} totalCount={tableData.length} setPage={setPage}/>
        </>
    )
}
