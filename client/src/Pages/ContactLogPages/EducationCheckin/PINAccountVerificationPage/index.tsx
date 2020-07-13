import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import Instructions from "../../Instructions";

export default class PINAccountVerificationPage extends React.Component {
    render() {
        return (
            <PageLayout pageTitle="Account Verification">
                <Logo dark />
                <Instructions>Verifying account...</Instructions>
            </PageLayout>
        )
    }
}