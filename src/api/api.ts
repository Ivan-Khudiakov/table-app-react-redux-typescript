import axios from "axios"
import {TableType} from "../redux/table-reducer"

const instance = axios.create({
    baseURL: `${process.env.PUBLIC_URL}/db.json`
})

export const tableAPI = {
    getData() {
        return instance.get<TableType>("")
    }
}
