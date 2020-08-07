import { combineReducers } from "redux"
import { navPanelReducer } from "./NavPanel/reducers";
import { checkInMenuReducer } from "./CheckInMenu/reducers";
import { userReducer } from "./User/reducers";
import { toastReducer } from "./Toast/reducers";
import { cartReducer } from "./Cart/reducers";
import { checkInAppReducer } from "./CheckInApp/reducers";

export default combineReducers({
    navPanel: navPanelReducer,
    checkInMenu: checkInMenuReducer,
    user: userReducer,
    toast: toastReducer,
    cart: cartReducer,
    checkInApp: checkInAppReducer
})