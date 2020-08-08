import React from "react";
import ICheckInRoute from "./ICheckInRouteProps";
import IRouteProps from "../IRouteProps";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";

const SyncPage = React.lazy(() => import("../../Pages/ContactLogPages/SyncPage"));

export default function SyncRoute(props : ICheckInRoute & IRouteProps) {
    return (
        <AuthenticateActiveSession unverified showError={props.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
            <SyncPage {...props} />
        </AuthenticateActiveSession>
    )
}