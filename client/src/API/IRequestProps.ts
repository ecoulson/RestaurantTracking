import IResponse from "./IResponse";
import { AxiosError } from "axios";

export default interface IRequestProps<T> {
    send: boolean;
    redirect?: boolean;
    onComplete?: (response : IResponse<T>) => void;
    onError?: (error? : AxiosError | IResponse<T>) => void;
}