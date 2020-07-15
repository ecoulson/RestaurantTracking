import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import LegalContainer from "../../LegalContainer";
import CancelPasswordRecoveryRequest from "../../../../API/CancelPasswordRecoveryRequest";

export default class CancelPasswordResetPage extends React.Component {
    private urlParams : URLSearchParams

    constructor(props : {}) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
    }

    render() {
        return (
            <PageLayout pageTitle="Cancel Password Reset">
                <CancelPasswordRecoveryRequest 
                    send
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string}
                    />
                <Logo dark />
                <OrganizationName>Cancel Password Reset</OrganizationName>
                <LegalContainer />
            </PageLayout>
        )
    }
}