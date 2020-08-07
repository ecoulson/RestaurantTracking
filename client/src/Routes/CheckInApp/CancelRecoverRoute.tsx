import React from "react";
import IRouteProps from "../IRouteProps";
import ICheckInRoute from "./ICheckInRouteProps";
import UnauthenticatedAccessWrapper from "../../Components/AuthenticationWrappers/UnauthenticatedAccessWrapper";

const CancelPasswordResetPage = React.lazy(() => import("../../Pages/ContactLogPages/CancelPasswordResetPage"));

export default function CancelRecoverRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <UnauthenticatedAccessWrapper unverified to={`/check-in/${props.match.params.organizationId}`} showError={props.showError}>
            <CancelPasswordResetPage {...props} />
        </UnauthenticatedAccessWrapper>
    )
}