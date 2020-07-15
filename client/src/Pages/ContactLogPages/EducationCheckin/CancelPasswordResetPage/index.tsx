import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import LegalContainer from "../../LegalContainer";
import CancelPasswordRecoveryRequest from "../../../../API/CancelPasswordRecoveryRequest";
import ICancelPasswordResetPageProps from "./ICancelPasswordResetPageProps";
import AppHistory from "../../../../AppHistory";

export default class CancelPasswordResetPage extends React.Component<ICancelPasswordResetPageProps> {
    private urlParams : URLSearchParams

    constructor(props : ICancelPasswordResetPageProps) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Cancel Password Reset">
                <CancelPasswordRecoveryRequest 
                    send
                    redirect
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string}
                    />
                <Logo dark />
                <OrganizationName>Cancel Password Reset</OrganizationName>
                <LegalContainer />
            </PageLayout>
        )
    }

    onComplete() {
        this.props.showSuccess("Canceled password recovery", 500);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`)
    }
}