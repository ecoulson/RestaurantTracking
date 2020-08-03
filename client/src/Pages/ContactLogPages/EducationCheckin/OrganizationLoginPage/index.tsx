import React from "react";
import IOrganizationLoginPageState from "./IOrganizationLoginPageState";
import PINLoginPage from "./PINLoginPage";
import IOrganizationLoginPageProps from "./IOrganizationLoginPageProps";
import CheckInLayout from "../../../../Layouts/CheckInLayout";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import OrganizationName from "../../OrganizationName";
import AppHistory from "../../../../AppHistory";
const VerifyPINPage = React.lazy(() => import("./VerifyPINPage"));
const PINEmailPage = React.lazy(() => import("./PINEmailPage"));

export default class OrganizationLoginPage extends React.Component<IOrganizationLoginPageProps, IOrganizationLoginPageState> {
    constructor(props: IOrganizationLoginPageProps) {
        super(props);
        this.state = {
            isEnteringPassword: false,
            isVerifying: false,
            isLogging: true,
            organizationName: ""
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.gotoPasswordScreen = this.gotoPasswordScreen.bind(this);
        this.gotoVerifyScreen = this.gotoVerifyScreen.bind(this);
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Login">
                <GetOrganizationNameRequest 
                    send 
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId} />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                {this.renderPage()}
            </CheckInLayout>
        );
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }

    renderPage() {
        if (this.state.isEnteringPassword) {
            return <PINLoginPage {...this.props} />
        }
        if (this.state.isVerifying) {
            AppHistory.push(`/verify/`)
        }
        return <PINEmailPage gotoPasswordScreen={this.gotoPasswordScreen} gotoVerifyPage={this.gotoVerifyScreen} {...this.props} />
    }

    gotoPasswordScreen() {
        this.setState({
            isEnteringPassword: true,
            isLogging: false
        })
    }

    gotoVerifyScreen() {
        this.setState({
            isVerifying: true,
            isLogging: false
        })
    }
}