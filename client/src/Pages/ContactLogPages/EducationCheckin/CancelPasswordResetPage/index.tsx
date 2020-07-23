import React from "react";
import OrganizationName from "../../OrganizationName";
import CancelPasswordRecoveryRequest from "../../../../API/CancelPasswordRecoveryRequest";
import ICancelPasswordResetPageProps from "./ICancelPasswordResetPageProps";
import AppHistory from "../../../../AppHistory";
import CheckInLayout from "../../../../Layouts/CheckInLayout";

export default class CancelPasswordResetPage extends React.Component<ICancelPasswordResetPageProps> {
    private urlParams : URLSearchParams

    constructor(props : ICancelPasswordResetPageProps) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <CheckInLayout pageTitle="Cancel Password Reset">
                <CancelPasswordRecoveryRequest 
                    send
                    redirect
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string}
                    />
                <OrganizationName>Cancel Password Reset</OrganizationName>
            </CheckInLayout>
        )
    }

    onComplete() {
        this.props.showSuccess("Canceled password recovery", 500);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`)
    }
}