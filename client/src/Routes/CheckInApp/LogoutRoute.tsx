import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";

const CheckInLogoutPage = React.lazy(() => import("../../Pages/ContactLogPages/CheckInLogoutPage"));

export default function LogoutRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <CheckInLogoutPage {...props} />
    )
}