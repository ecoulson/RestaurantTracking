import { RouteComponentProps } from "react-router-dom";

export default interface ICheckOutPageProps extends RouteComponentProps<{
    organizationId: string
}> {
    showSuccess: (message: string, duration: number) => void;
}