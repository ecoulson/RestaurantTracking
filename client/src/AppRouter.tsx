import React from "react";
import {
    Switch,
    Route,
    Router
} from "react-router-dom";
import App from "./App";
import Login from "./Pages/AuthenticationPages/Login";
import AppHistory from "./AppHistory";
import Logout from "./Pages/AuthenticationPages/Logout";
import VerifyAccountPage from "./Pages/AuthenticationPages/VerifyAccountPage";
import VerificationPage from "./Pages/AuthenticationPages/VerificationPage";
import UserRegistrationPage from "./Pages/AuthenticationPages/UserRegistrationPage";
import ForgotPasswordPage from "./Pages/AuthenticationPages/ForgotPasswordPage";
import SpamRegistrationPage from "./Pages/AuthenticationPages/SpamRegistrationPage";
import CancelPasswordRecoveryPage from "./Pages/AuthenticationPages/CancelPasswordRecoveryPage";
import ConfirmPasswordRecoveryPage from "./Pages/AuthenticationPages/ConfirmPasswordRecoveryPage";
import ResetPasswordPage from "./Pages/AuthenticationPages/ResetPasswordPage";
import DashboardPage from "./Pages/DashboardPage";
import AuthenticateActiveSession from "./Components/AuthenticationWrappers/AuthenticateActiveSession";
import Toast from "./Components/Toast";
import ToastType from "./Components/Toast/ToastType";
import IAppRouterState from "./IAppRouterState";
import UnauthenticatedAccessWrapper from "./Components/AuthenticationWrappers/UnauthenticatedAccessWrapper";
import MarketplacePage from "./Pages/MarketplacePage";
import LearnMoreLayout from "./Layouts/LearnMoreLayout";
import UserProfilePage from "./Pages/UserProfilePage";
import HelpPage from "./Pages/HelpPage";
import LegalPage from "./Pages/LegalPage";
import AuthenticationLayout from "./Layouts/AuthenticationLayout";
import HomePage from "./Pages/HomePage";
import PINEmailPage from "./Pages/ContactLogPages/EducationCheckin/PINEmailPage";
import PINLoginPage from "./Pages/ContactLogPages/EducationCheckin/PINLoginPage";
import SetPINPage from "./Pages/ContactLogPages/EducationCheckin/SetPINPage";
import ResetPINPage from "./Pages/ContactLogPages/EducationCheckin/ResetPINPage";
import VerifyPINAccountPage from "./Pages/ContactLogPages/EducationCheckin/VerifyPINAccountPage";
import PINAccountVerificationPage from "./Pages/ContactLogPages/EducationCheckin/PINAccountVerificationPage";

export default class AppRouter extends React.Component<{}, IAppRouterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: "",
            type: ToastType.Error
        }
        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
    }

    render() {
        return (
            <Router history={AppHistory}>
                <Toast type={this.state.type} message={this.state.message} />
                <Switch>
                    <Route path="/learn-more/:product" render={
                        (props) => (
                            <LearnMoreLayout {...props} />
                        )
                    }/>
                    <Route path="/legal/:documentName" render={
                        (props) => (
                            <LegalPage {...props} />
                        )
                    }/>
                    <Route exact path="/login">
                        <UnauthenticatedAccessWrapper to="/dashboard" showError={this.showError}>
                            <AuthenticationLayout pageTitle="Login">
                                <Login/>
                            </AuthenticationLayout>
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/dashboard">
                        <AuthenticateActiveSession showError={this.showError}>
                            <DashboardPage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/marketplace">
                        <AuthenticateActiveSession showError={this.showError}>
                            <MarketplacePage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/spam">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <SpamRegistrationPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/settings">
                        <AuthenticateActiveSession showError={this.showError}>
                            <UserProfilePage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/cancel-recover">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <CancelPasswordRecoveryPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/confirm-recover">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <ConfirmPasswordRecoveryPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/reset-password">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <ResetPasswordPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/logout">
                        <Logout showSuccess={this.showSuccess}/>
                    </Route>
                    <Route exact path="/verify">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <VerifyAccountPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/verification">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <VerificationPage showSuccess={this.showSuccess}/>
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/register">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <UserRegistrationPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/forgot-password">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <ForgotPasswordPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/check-in">
                        <App />
                    </Route>
                    <Route exact path="/check-in/:organizationId/login" render={
                        (props) => (
                            <PINEmailPage {...props} />
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/login-password" render={
                        (props) => (
                            <PINLoginPage {...props} />
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/setup" render={
                        (props) => (
                            <SetPINPage {...props} />
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/reset-password" render={
                        (props) => (
                            <ResetPINPage {...props} />
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/verify-account" render={
                        (props) => (
                            <VerifyPINAccountPage {...props} />
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/verification" render ={
                        (props) => (
                            <PINAccountVerificationPage {...props} />
                        )
                    }/>
                    <Route exact path="/help">
                        <AuthenticateActiveSession showError={this.showError}>
                            <HelpPage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </Router>
        )
    }

    private showError(message: string, time: number) {
        this.setState({ 
            message,
            type: ToastType.Error
        })
        setTimeout(() => {
            this.setState({ message: "" })
        }, time); 
    }

    private showSuccess(message: string, time: number) {
        this.setState({ 
            message,
            type: ToastType.Success
        })
        setTimeout(() => {
            this.setState({ message: "" })
        }, time); 
    }
}