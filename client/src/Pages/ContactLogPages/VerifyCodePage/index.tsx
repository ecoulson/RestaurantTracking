import React from "react";
import IVerifyCodePageProps from "./IVerifyCodePageProps";
import OrganizationName from "../Components/OrganizationName";
import IVerifyCodePageState from "./IVerifyCodePageState";
import GetOrganizationNameRequest from "../../../API/GetOrganizationNameRequest";
import IResponse from "../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";

const VerifyPINPage = React.lazy(() => import("../OrganizationLoginPage/VerifyPINPage"));

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
            <>
                <GetOrganizationNameRequest
                    send
                    onComplete={this.handleOrganizationName}
                    organizationId={this.props.match.params.organizationId} />
                <OrganizationName organizationId={this.props.match.params.organizationId} />
                <VerifyPINPage {...this.props}/> 
            </>
        )
    }

    handleOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }
}