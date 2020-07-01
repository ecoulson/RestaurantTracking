import { INavPanel, NavPanelActionTypes, NavPanelActions } from "./types";

const initialState : INavPanel = {
    collapsed: false
}

export function toggleCollapseReducer(state = initialState, action : NavPanelActionTypes) {
    switch (action.type) {
        case NavPanelActions.TOGGLE_COLLAPSE:
            return {
                collapsed: !state.collapsed
            }
        default:
            return state;
    }
}
