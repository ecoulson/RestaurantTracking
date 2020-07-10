import IRequestProps from "../IRequestProps";

export default interface IUserRegistrationRequestProps extends IRequestProps<{}> {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}