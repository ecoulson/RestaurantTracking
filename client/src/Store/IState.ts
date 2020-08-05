import { INavPanel } from "./NavPanel/types";
import { IUserState } from "./User/types";
import { ICheckInMenu } from "./CheckInMenu/types";
import { IToast } from "./Toast/types";
import { ICart } from "./Cart/types";

export default interface IState {
    navPanel: INavPanel;
    user: IUserState;
    checkInMenu: ICheckInMenu;
    toast: IToast;
    cart: ICart;
}