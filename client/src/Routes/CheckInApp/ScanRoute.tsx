import React from "react";
import IRouteProps from "../IRouteProps";
import ICheckInRoute from "./ICheckInRouteProps";
import IBuildingCheckInRoute from "./IBuildingCheckInRoute";
import ScanPage from "../../Pages/ContactLogPages/ScanPage";

export default function ScanRoute(props : IRouteProps & ICheckInRoute & IBuildingCheckInRoute) {
    return (
        <ScanPage {...props} />
    )
}