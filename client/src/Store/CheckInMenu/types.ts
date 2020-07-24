export interface ICheckInMenu {
    hidden: boolean;
}

export enum CheckInMenuActions {
    HIDE = "Hide",
    SHOW = "Show"
}

interface IToggleCheckInMenuHideAction {
    type: CheckInMenuActions.HIDE
}

interface IToggleCheckInMenuShowAction {
    type: CheckInMenuActions.SHOW
}

export type CheckInMenuActionTypes = IToggleCheckInMenuHideAction | IToggleCheckInMenuShowAction;