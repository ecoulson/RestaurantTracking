import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import IVerifyPINAccountPageProps from "./IVerifyPINAccountPageProps";
import OrganizationName from "../../OrganizationName";
import IVerifyPINAccountPageState from "./IVerifyPINAccountPageState";

export default class VerifyPINAccountPage extends React.Component<IVerifyPINAccountPageProps, IVerifyPINAccountPageState> {
    render() {
        return (
            <PageLayout pageTitle="Verify PIN Account">
                <Logo dark />
                <OrganizationName></OrganizationName>
            </PageLayout>
        )
    }
}