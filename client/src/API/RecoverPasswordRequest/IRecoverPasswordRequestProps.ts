import IRequestProps from "../IRequestProps";

export default interface IRecoverPasswordRequestProps extends IRequestProps<{}> {
    email: string;
    url: string;
}