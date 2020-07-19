import { RouteComponentProps } from "react-router-dom";

export default interface IScanPageProps extends RouteComponentProps<{
    organizationId: string;
    building: string;
}> {
    showSuccess: (message: string, delay: number) => void;
    showError: (message: string, delay: number) => void;
}