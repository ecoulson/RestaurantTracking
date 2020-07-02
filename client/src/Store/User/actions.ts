import { IUserState, UserActionTypes, UserActions } from "./types";

export function getUserAction() : UserActionTypes {
    return {
        type: UserActions.GET
    }
}

export function setUserAction(user : IUserState) : UserActionTypes {
    return {
        type: UserActions.SET,
        profilePicture: user.profilePicture,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName
    }
}