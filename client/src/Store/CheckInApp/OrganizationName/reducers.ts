import { IOrganizationName, OrganizationNameTypes, OrganizationNameActions } from "./types";

const initialState : IOrganizationName = {
    fetched: false,
    fetching: false,
    organizationId: null,
    name: null
}

export function organizationNameReducer(state = initialState, action : OrganizationNameTypes) {
    switch (action.type) {
        case OrganizationNameActions.GET:
            if (!state.fetched) {
                return {
                    ...state,
                    fetching: true,
                    organizationId: action.organizationId
                }
            }
            return state
        case OrganizationNameActions.SET:
            return {
                ...state,
                fetched: true,
                fetching: false,
                name: action.organizationName
            }
        default:
            return state;
    }
}
