import { INavPanel, NavPanelActionTypes, NavPanelActions } from "./types";

const initialState : INavPanel = {
    collapsed: true,
    hidden: false,
}

export function toggleCollapseReducer(state = initialState, action : NavPanelActionTypes) {
    switch (action.type) {
        case NavPanelActions.TOGGLE_COLLAPSE:
            return {
                collapsed: !state.collapsed
            }
        case NavPanelActions.TOGGLE_HIDDEN:
            return {
                hidden: !state.hidden
            }
        default:
            return state;
    }
}
