import { ICheckInMenu, CheckInMenuActionTypes, CheckInMenuActions } from "./types";

const initialState : ICheckInMenu = {
    hidden: true,
}

export function checkInMenuReducer(state = initialState, action : CheckInMenuActionTypes) {
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
