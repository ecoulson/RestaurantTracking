import { INavPanel, NavPanelActionTypes, NavPanelActions } from "./types";

export function toggleNavPanelCollapseAction(navPanel : INavPanel) : NavPanelActionTypes {
    return {
        type: NavPanelActions.TOGGLE_COLLAPSE,
        collapsed: navPanel.collapsed
    }
}