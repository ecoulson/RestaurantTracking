export interface INavPanel {
    collapsed: boolean;
    hidden: boolean;
}

export enum NavPanelActions {
    TOGGLE_COLLAPSE = "Toggle_Collapse",
    TOGGLE_HIDDEN = "Toggle_Hidden",
}

interface IToggleCollapseAction {
    type: NavPanelActions.TOGGLE_COLLAPSE;
}

interface IToggleHiddenAction {
    type: NavPanelActions.TOGGLE_HIDDEN
}

export type NavPanelActionTypes = IToggleCollapseAction | IToggleHiddenAction;