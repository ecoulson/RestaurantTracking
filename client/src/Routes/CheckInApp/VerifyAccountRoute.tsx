import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";

const VerifyPINAccountPage = React.lazy(() => import("../../Pages/ContactLogPages/VerifyPINAccountPage"));

export default function VerifyAccountRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified to={`/check-in/${props.match.params.organizationId}`} showError={props.showError}>
            <VerifyPINAccountPage {...props} />
        </AuthenticateActiveSession>
    )
}