import IRequestProps from "../IRequestProps";

export default interface ISpamRegistrationRequestProps extends IRequestProps<{}> {
    email: string;
    token: string;
}