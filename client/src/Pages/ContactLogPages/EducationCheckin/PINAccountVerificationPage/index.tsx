import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import VerificationRequest from "../../../../API/VerificationRequest";
import OrganizationName from "../../OrganizationName";
import IPINAccountVerificationPageProps from "./IPINAccountVerificationPageProps";
import AppHistory from "../../../../AppHistory";
import LegalContainer from "../../LegalContainer";

export default class PINAccountVerificationPage extends React.Component<IPINAccountVerificationPageProps> {
    private urlParams : URLSearchParams;

    constructor(props : any) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
        
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Account Verification">
                <VerificationRequest 
                    send
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string} 
                    onComplete={this.onComplete} />
                <Logo dark />
                <OrganizationName>Verifying account...</OrganizationName>
                <LegalContainer />
            </PageLayout>
        )
    }

    onComplete() {
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`)
    }
}