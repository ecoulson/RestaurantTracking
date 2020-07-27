import React from "react";
import IOrganizationLoginPageState from "./IOrganizationLoginPageState";
import PINLoginPage from "./PINLoginPage";
import IOrganizationLoginPageProps from "./IOrganizationLoginPageProps";
import VerifyPINPage from "./VerifyPINPage";
import PINEmailPage from "./PINEmailPage";

export default class OrganizationLoginPage extends React.Component<IOrganizationLoginPageProps, IOrganizationLoginPageState> {
    constructor(props: IOrganizationLoginPageProps) {
        super(props);
        this.state = {
            isEnteringPassword: false,
            isVerifying: false,
            isLogging: true
        }

        this.gotoPasswordScreen = this.gotoPasswordScreen.bind(this);
        this.gotoVerifyScreen = this.gotoVerifyScreen.bind(this);
    }

    render() {
        if (this.state.isEnteringPassword) {
            return <PINLoginPage {...this.props} />
        }
        if (this.state.isVerifying) {
            return <VerifyPINPage {...this.props} />
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