import IRequestProps from "../IRequestProps";
import IApp from "../../lib/IApp";

export default interface IGetAppRequest extends IRequestProps<IApp> {
    id: string;
}