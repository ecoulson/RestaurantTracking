import { IEnqueueToastAction } from "../../Store/Toast/types"

export default interface IPasswordState {
    password: string;
    message: IEnqueueToastAction | null;
    valid?: boolean;
}