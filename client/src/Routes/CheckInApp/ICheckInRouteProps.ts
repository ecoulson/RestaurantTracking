import { RouteComponentProps } from "react-router-dom";

export default interface ICheckInRoute extends RouteComponentProps<{
    organizationId: string;
}> {}