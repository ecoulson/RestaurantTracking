import { RouteComponentProps } from "react-router-dom";

export default interface IBuildingCheckInRoute extends RouteComponentProps<{
    building: string;
}> {}