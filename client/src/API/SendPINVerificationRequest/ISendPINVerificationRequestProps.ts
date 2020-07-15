import IRequestProps from "../IRequestProps";

export default interface ISendPINVerificationRequestProps extends IRequestProps<{}> {
    email: string;
    organizationId: string;
}