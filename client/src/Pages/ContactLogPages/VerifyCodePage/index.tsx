import React from "react";
import CheckInLayout from "../../../Layouts/CheckInLayout";
import IVerifyCodePageProps from "./IVerifyCodePageProps";
import VerifyPINPage from "../OrganizationLoginPage/VerifyPINPage";
import OrganizationName from "../Components/OrganizationName";
import IVerifyCodePageState from "./IVerifyCodePageState";
import GetOrganizationNameRequest from "../../../API/GetOrganizationNameRequest";
import IResponse from "../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";

export default class VerifyCodePage extends React.Component<IVerifyCodePageProps, IVerifyCodePageState> {
    constructor(props : IVerifyCodePageProps) {
        super(props);
        this.state = {
            organizationName: ""
        }
        this.handleOrganizationName = this.handleOrganizationName.bind(this);
    } 

    render() {
        return (
            <CheckInLayout pageTitle="Verify Code" organizationId={this.props.match.params.organizationId}>
                <GetOrganizationNameRequest
                    send
                    onComplete={this.handleOrganizationName}
                    organizationId={this.props.match.params.organizationId} />
                <OrganizationName organizationId={this.props.match.params.organizationId} />
                <VerifyPINPage {...this.props}/> 
            </CheckInLayout>
        )
    }

    handleOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }
}