import React from "react";
import UnauthenticatedAccessWrapper from "../../Components/AuthenticationWrappers/UnauthenticatedAccessWrapper";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";

const OrganizationLoginPage = React.lazy(() => import("../../Pages/ContactLogPages/OrganizationLoginPage"));

export default function LoginRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <UnauthenticatedAccessWrapper unverified to={`/check-in/${props.match.params.organizationId}`} showError={props.showError}>
            <OrganizationLoginPage {...props} />
        </UnauthenticatedAccessWrapper>
    )
}