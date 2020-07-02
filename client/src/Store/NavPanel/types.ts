export interface INavPanel {
    collapsed: boolean;
}

export enum NavPanelActions {
    TOGGLE_COLLAPSE = "Toggle_Collapse",
}

interface IToggleCollapseAction {
    type: NavPanelActions.TOGGLE_COLLAPSE;
    collapsed: boolean;
}

export type NavPanelActionTypes = IToggleCollapseAction;