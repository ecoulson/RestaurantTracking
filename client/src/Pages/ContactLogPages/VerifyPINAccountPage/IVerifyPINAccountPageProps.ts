import { RouteComponentProps } from "react-router-dom";

export default interface IVerifyPINAccountPageProps extends RouteComponentProps<{
    organizationId: string;
}> {
    showSuccess: (message: string, delay: number) => void
}