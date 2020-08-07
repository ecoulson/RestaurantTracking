import React from "react";
import IRouteProps from "../IRouteProps";
import ICheckInRoute from "./ICheckInRouteProps";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";

const ActiveCheckInPage = React.lazy(() => import("../../Pages/ContactLogPages/ActiveCheckInPage"));

export default function ActiveCheckInRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified showError={props.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
            <ActiveCheckInPage {...props} />
        </AuthenticateActiveSession>
    )
}