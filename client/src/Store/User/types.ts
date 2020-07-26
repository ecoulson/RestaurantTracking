export interface IUserState {
    hasFetched: boolean;
    isFetching: boolean;
    profilePicture?: string;
    username: string;
    email: string;
    lastName: string;
    firstName: string;
    organizations: string[]
}

export enum UserActions {
    GET = "GET",
    SET = "SET"
}

interface IGetUserAction {
    type: UserActions.GET
}

interface ISetUserAction {
    type: UserActions.SET,
    profilePicture?: string,
    username: string,
    lastName: string,
    firstName: string,
    email: string,
    organizations: string[]
}

export type UserActionTypes = IGetUserAction | ISetUserAction;