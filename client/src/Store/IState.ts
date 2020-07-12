import { INavPanel } from "./NavPanel/types";
import { IUserState } from "./User/types";

export default interface IState {
    navPanel: INavPanel;
    user: IUserState
}