import React from "react";
import OrganizationName from "../Components/OrganizationName";
import CancelPasswordRecoveryRequest from "../../../API/CancelPasswordRecoveryRequest";
import ICancelPasswordResetPageProps from "./ICancelPasswordResetPageProps";
import AppHistory from "../../../AppHistory";
import CheckInLayout from "../../../Layouts/CheckInLayout";

export default class CancelPasswordResetPage extends React.Component<ICancelPasswordResetPageProps> {
    private urlParams : URLSearchParams

    constructor(props : ICancelPasswordResetPageProps) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Cancel Password Reset">
                <CancelPasswordRecoveryRequest 
                    send
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string}
                    />
                <OrganizationName>Cancel Password Reset</OrganizationName>
            </CheckInLayout>
        )
    }

    onComplete() {
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`)
    }
}