import { IUserState, UserActionTypes, UserActions } from "./types";

const initialState : IUserState = {
    hasFetched: false,
    isFetching: false,
    email: "",
    lastName: "",
    firstName: "",
    username: "",
    organizations: []
}

export function userReducer(state = initialState, action : UserActionTypes) {
    switch (action.type) {
        case UserActions.GET:
            return {
                isFetching: true
            }
        case UserActions.SET:
            return {
                hasFetched: true,
                isFetching: false,
                profilePicture: action.profilePicture,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                username: action.username,
                organizations: action.organizations
            }
        default:
            return state;
    }
}