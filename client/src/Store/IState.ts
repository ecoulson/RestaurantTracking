import { INavPanel } from "./NavPanel/types";
import { IUserState } from "./User/types";
import { ICheckInMenu } from "./CheckInMenu/types";

export default interface IState {
    navPanel: INavPanel;
    user: IUserState;
    checkInMenu: ICheckInMenu;
}