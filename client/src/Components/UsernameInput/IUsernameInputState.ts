import { IEnqueueToastAction } from "../../Store/Toast/types";

export default interface IUsernameInputState {
    username: string;
    valid?: boolean;
    message: IEnqueueToastAction | null;
}