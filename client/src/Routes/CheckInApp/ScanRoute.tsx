import React from "react";
import IRouteProps from "../IRouteProps";
import ICheckInRoute from "./ICheckInRouteProps";
import IBuildingCheckInRoute from "./IBuildingCheckInRoute";

const ScanPage = React.lazy(() => import("../../Pages/ContactLogPages/ScanPage"));

export default function ScanRoute(props : IRouteProps & ICheckInRoute & IBuildingCheckInRoute) {
    return (
        <ScanPage {...props} />
    )
}