import { RouteComponentProps } from "react-router-dom";

export default interface ISetPINPageProps extends RouteComponentProps<{
    organizationId: string
}> {}