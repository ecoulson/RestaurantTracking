import { RouteComponentProps } from "react-router-dom";

export default interface IPurchasePageProps extends RouteComponentProps<{
    product: string
}> {
    showSuccess: (message: string, delay: number) => void;
}