import { RouteComponentProps } from "react-router-dom";

export default interface IActiveCheckInPageProps extends RouteComponentProps<{
    organizationId: string;
}> {
    showSuccess: (message: string, delay: number) => void;
}