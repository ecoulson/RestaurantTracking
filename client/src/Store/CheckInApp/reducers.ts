import { combineReducers } from "redux";
import { organizationNameReducer } from "./OrganizationName/reducers";

export const checkInAppReducer = combineReducers({
    organizationName: organizationNameReducer
})