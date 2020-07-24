import { combineReducers } from "redux"
import { toggleCollapseReducer } from "./NavPanel/reducers";
import { toggleCheckInMenuReducer } from "./CheckInMenu/reducers";
import { getUserReducer } from "./User/reducers";

export default combineReducers({
    navPanel: toggleCollapseReducer,
    checkInMenu: toggleCheckInMenuReducer,
    user: getUserReducer
})