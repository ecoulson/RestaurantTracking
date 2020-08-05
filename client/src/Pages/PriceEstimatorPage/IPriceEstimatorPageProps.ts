import { RouteComponentProps } from "react-router-dom";

export default interface IPriceEstimatorPageProps extends RouteComponentProps<{
    product: string
}> {
    showError: (message: string, delay: number) => void;
    showSuccess: (message: string, delay: number) => void;
}