import { RouteComponentProps } from "react-router-dom";

export default interface IPINEmailPageProps extends RouteComponentProps<{
    organizationId: string;
}>{
    gotoPasswordScreen: () => void;
    gotoRegisterScreen: () => void;
}