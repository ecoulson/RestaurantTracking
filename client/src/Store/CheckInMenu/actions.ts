import { CheckInMenuActionTypes, CheckInMenuActions } from "./types";

export function toggleCheckInMenuHideAction() : CheckInMenuActionTypes {
    return {
        type: CheckInMenuActions.HIDE
    }
}

export function toggleCheckInMenuShowAction() : CheckInMenuActionTypes {
    return {
        type: CheckInMenuActions.SHOW
    }
}