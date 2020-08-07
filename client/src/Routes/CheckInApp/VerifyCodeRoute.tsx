import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";

const VerifyCodePage = React.lazy(() => import("../../Pages/ContactLogPages/VerifyCodePage"));

export default function VerifyCodeRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified to={`/check-in/${props.match.params.organizationId}`} showError={props.showError}>
            <VerifyCodePage {...props} />
        </AuthenticateActiveSession>
    )
}