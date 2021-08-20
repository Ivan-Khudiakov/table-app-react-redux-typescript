import React, {ChangeEvent, useState} from 'react'
import {FieldType, SymbolType} from "../../redux/table-reducer"
import './Filter.css'

type PropsType = {
    filter: (field: FieldType, symbol: string, value: string) => void
}

export const Filter: React.FC<PropsType> = ({filter}) => {

    const[field, setField] = useState<FieldType>("name")
    const[symbol, setSymbol] = useState<SymbolType>("equally")
    const[value, setValue] = useState("")

    const onChangeField = (e: ChangeEvent<HTMLSelectElement>) => {
        setField(e.currentTarget.value as FieldType)
    }
    const onChangeSymbol = (e: ChangeEvent<HTMLSelectElement>) => {
        setSymbol(e.currentTarget.value as SymbolType)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const filterTable = (field: FieldType, symbol: string, value: string) => {
        filter(field, symbol, value)
    }

    return (
        <div className="filter">
            <select value={field} onChange={onChangeField}>
                <option>name</option>
                <option>quantity</option>
                <option>distance</option>
            </select>
            <select value={symbol} onChange={onChangeSymbol}>
                <option>equally</option>
                <option>include</option>
                <option>more</option>
                <option>less</option>
            </select>
            <input onChange={onChangeHandler} value={value}/>
            <button onClick={() => filterTable(field, symbol, value)}>Фильтровать</button>
        </div>
    )
}
