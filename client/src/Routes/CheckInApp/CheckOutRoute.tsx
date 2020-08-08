import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";

const CheckOutPage = React.lazy(() => import("../../Pages/ContactLogPages/CheckOutPage"));

export default function CheckOutRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified showError={props.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
            <CheckOutPage {...props} />
        </AuthenticateActiveSession>
    )
}