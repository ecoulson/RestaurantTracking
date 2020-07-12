import IRequestProps from "../IRequestProps";

export default interface IVerificationRequestProps extends IRequestProps<{}> { 
    email: string;
    token: string;
}