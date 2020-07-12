import { NavPanelActionTypes, NavPanelActions } from "./types";

export function toggleNavPanelCollapseAction() : NavPanelActionTypes {
    return {
        type: NavPanelActions.TOGGLE_COLLAPSE
    }
}

export function toggleNavPanelHideAction() : NavPanelActionTypes {
    return {
        type: NavPanelActions.TOGGLE_HIDDEN
    }
}