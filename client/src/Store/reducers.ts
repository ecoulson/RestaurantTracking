import { combineReducers } from "redux"
import { toggleCollapseReducer } from "./NavPanel/reducers";
import { getUserReducer } from "./User/reducers";

export default combineReducers({
    navPanel: toggleCollapseReducer,
    user: getUserReducer
})