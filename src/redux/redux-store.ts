import { createStore } from "redux"
import { applyMiddleware } from "redux"
import { combineReducers } from "redux"
import {tableReducer} from "./table-reducer"
import thunkMiddleware from "redux-thunk"

const reducer = combineReducers({
    table: tableReducer
})

export type AppRootStateType = ReturnType<typeof reducer>

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))
