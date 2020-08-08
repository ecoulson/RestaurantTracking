import React from "react";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";

const VerifyAnonymousAccountPage = React.lazy(() => import("../../Pages/ContactLogPages/VerifyAnonymousAccountPage"));

export default function VerifyAnonymousRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified showError={props.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
            <VerifyAnonymousAccountPage {...props} />
        </AuthenticateActiveSession>
    )
}