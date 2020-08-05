import { RouteComponentProps } from "react-router-dom";

export default interface IRegisterAccountPageProps extends RouteComponentProps<{
    organizationId: string
}> {
    onAccountCreate: () => void;
}