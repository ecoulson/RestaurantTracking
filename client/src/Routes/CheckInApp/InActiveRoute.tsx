import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";

const InActiveAppPage = React.lazy(() => import("../../Pages/ContactLogPages/InActiveAppPage"));

export default function InActiveRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <InActiveAppPage {...props} />
    )
}