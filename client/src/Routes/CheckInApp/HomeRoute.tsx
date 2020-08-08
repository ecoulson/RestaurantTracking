import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";

const OrganizationCheckInPage = React.lazy(() => import("../../Pages/ContactLogPages/OrganizationCheckInPage"));

export default function HomeRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified showError={props.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
            <OrganizationCheckInPage {...props} />
        </AuthenticateActiveSession>
    )
}