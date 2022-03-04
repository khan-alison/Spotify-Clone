import {reducers} from "./reducers";
import {combineReducers} from "redux";


export const rootReducer = combineReducers({
    auth: reducers,
})