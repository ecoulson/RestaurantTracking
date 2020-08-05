import React from "react";
import CheckInLayout from "../../../Layouts/CheckInLayout";
import IVerifyCodePageProps from "./IVerifyCodePageProps";
import VerifyPINPage from "../OrganizationLoginPage/VerifyPINPage";
import OrganizationName from "../Components/OrganizationName";

export default class VerifyCodePage extends React.Component<IVerifyCodePageProps> {
    render() {
        return (
            <CheckInLayout pageTitle="Verify Code" organizationId={this.props.match.params.organizationId}>
                <OrganizationName>Org</OrganizationName>
                <VerifyPINPage {...this.props}/> 
            </CheckInLayout>
        )
    }
}