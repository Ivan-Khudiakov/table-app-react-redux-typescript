import {Dispatch} from "react"
import {tableAPI} from "../api/api"

// types
export type FieldType = "name" | "quantity" | "distance"
export type SymbolType = "equally" | "include" | "more" | "less"
export type TableStringType = { 
    id: number, 
    date: string, 
    name: string, 
    quantity: string,
    distance: string
}
export type TableType = Array<TableStringType>

const initialState = {
    pageSize: 15,
    currentPage: 1,
    table: [
        {id: 0, date: "", name: "", quantity: "0", distance: "0"}
    ]
}
export type StateType = typeof initialState

export const tableReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case SET_TABLE: {
            return {...state, table: action.table}
        }
        case SORT_TABLE: {
            return {...state,
                table: [...state.table.sort((a, b) => {return +a[action.field] > +b[action.field] ? 1: -1})]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case GET_FILTERED_TABLE: {
            let filteredTable: TableType = []
            if(action.symbol === "equally") {
                filteredTable = state.table.filter(item => item[action.field] === action.value)
            } else if(action.symbol === "include") {
                filteredTable = state.table.filter(item => item[action.field].indexOf(action.value) >= 0)
            } else if(action.symbol === "more") {
                filteredTable = state.table.filter(item => +item[action.field] > +action.value)
            }  else filteredTable = state.table.filter(item => +item[action.field] < +action.value)
            return {...state, table: [...filteredTable]}
        }
        default:
            return state
    }
}

const SET_TABLE = "table/SET_TABLE"
const SORT_TABLE = "table/SORT_TABLE"
const SET_CURRENT_PAGE = "table/SET_CURRENT_PAGE"
const GET_FILTERED_TABLE = "table/GET_FILTERED_TABLE"

type ActionType =
    ReturnType<typeof setTable> |
    ReturnType<typeof sortTable> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof getFilteredTable>

// actionCreators
export const setTable = (table: TableType) => ({type: SET_TABLE, table} as const)
export const sortTable = (field: FieldType) => ({type: SORT_TABLE, field} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const getFilteredTable = (field: FieldType, symbol: string, value: string) => ({type: GET_FILTERED_TABLE, field, symbol, value} as const)

// thunkCreators
export const getTable = () => async (dispatch: Dispatch<any>) => {
    try {
        let response = await tableAPI.getData()
        dispatch(setTable(response.data))
    } catch (error) {
        console.log(error)
    }
}
