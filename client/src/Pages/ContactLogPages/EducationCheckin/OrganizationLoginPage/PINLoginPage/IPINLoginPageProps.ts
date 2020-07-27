import { RouteComponentProps } from "react-router-dom";

export default interface IPinLoginPageProps extends RouteComponentProps<{
    organizationId: string
}> {}