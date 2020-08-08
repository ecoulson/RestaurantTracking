import React from "react";
import UnauthenticatedAccessWrapper from "../../Components/AuthenticationWrappers/UnauthenticatedAccessWrapper";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";

const ResetPINPage = React.lazy(() => import("../../Pages/ContactLogPages/ResetPINPage"));

export default function ResetPasswordRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <UnauthenticatedAccessWrapper unverified to={`/check-in/${props.match.params.organizationId}`} showError={props.showError}>
            <ResetPINPage {...props} />
        </UnauthenticatedAccessWrapper>
    )
}