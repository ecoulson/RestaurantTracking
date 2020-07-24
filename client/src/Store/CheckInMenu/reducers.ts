import { ICheckInMenu, CheckInMenuActionTypes, CheckInMenuActions } from "./types";

const initialState : ICheckInMenu = {
    hidden: true,
}

export function toggleCheckInMenuReducer(state = initialState, action : CheckInMenuActionTypes) {
    switch (action.type) {
        case CheckInMenuActions.HIDE:
            return {
                hidden: true
            }
        case CheckInMenuActions.SHOW:
            return {
                hidden: false
            }
        default:
            return state;
    }
}
