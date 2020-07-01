import { combineReducers } from "redux"
import { toggleCollapseReducer } from "./NavPanel/reducers";

export default combineReducers({
    navPanel: toggleCollapseReducer
})