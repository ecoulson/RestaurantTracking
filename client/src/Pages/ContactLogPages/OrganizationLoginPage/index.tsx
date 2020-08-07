import React from "react";
import IOrganizationLoginPageState from "./IOrganizationLoginPageState";
import IOrganizationLoginPageProps from "./IOrganizationLoginPageProps";
import GetOrganizationNameRequest from "../../../API/GetOrganizationNameRequest";
import IResponse from "../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import OrganizationName from "../Components/OrganizationName";

const PINLoginPage = React.lazy(() => import("./PINLoginPage"));
const RegisterAccountPage = React.lazy(() => import("./RegisterAccountPage"));
const VerifyPINPage = React.lazy(() => import("./VerifyPINPage"));
const PINEmailPage = React.lazy(() => import("./PINEmailPage"));

export default class OrganizationLoginPage extends React.Component<IOrganizationLoginPageProps, IOrganizationLoginPageState> {
    constructor(props: IOrganizationLoginPageProps) {
        super(props);
        this.state = {
            isEnteringPassword: false,
            isRegistering: false,
            isVerifying: false,
            isLogging: true,
            organizationName: "",
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.gotoPasswordScreen = this.gotoPasswordScreen.bind(this);
        this.gotoRegisterScreen = this.gotoRegisterScreen.bind(this);
        this.gotoVerifyingScreen = this.gotoVerifyingScreen.bind(this);
    }

    render() {
        return (
            <>
                <GetOrganizationNameRequest 
                    send 
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId} />
                <OrganizationName organizationId={this.props.match.params.organizationId} />
                {this.renderPage()}
            </>
        );
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }

    renderPage() {
        if (this.state.isEnteringPassword) {
            return <PINLoginPage 
                        gotoVerifyScreen={this.gotoVerifyingScreen}
                        {...this.props} />
        }
        if (this.state.isRegistering) {
            return <RegisterAccountPage 
                        onAccountCreate={this.gotoVerifyingScreen}
                        {...this.props} />
        }
        if (this.state.isVerifying) {
            return <VerifyPINPage {...this.props} />
        }
        return <PINEmailPage 
                    gotoPasswordScreen={this.gotoPasswordScreen} 
                    gotoRegisterScreen={this.gotoRegisterScreen} 
                    {...this.props} />
    }

    gotoPasswordScreen() {
        this.setState({
            isEnteringPassword: true,
            isLogging: false,
            isVerifying: false,
            isRegistering: false,
        })
    }

    gotoRegisterScreen() {
        this.setState({
            isRegistering: true,
            isLogging: false,
            isEnteringPassword: false,
            isVerifying: false,
        })
    }

    gotoVerifyingScreen() {
        this.setState({
            isRegistering: false,
            isLogging: false,
            isEnteringPassword: false,
            isVerifying: true
        })
    }
}