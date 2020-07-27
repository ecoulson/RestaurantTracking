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
import PINEmailPage from "./Pages/ContactLogPages/EducationCheckin/OrganizationLoginPage/PINEmailPage";
import PINLoginPage from "./Pages/ContactLogPages/EducationCheckin/OrganizationLoginPage/PINLoginPage";
import VerifyPINPage from "./Pages/ContactLogPages/EducationCheckin/OrganizationLoginPage/VerifyPINPage";
import ResetPINPage from "./Pages/ContactLogPages/EducationCheckin/ResetPINPage";
import CheckInLogoutPage from "./Pages/ContactLogPages/EducationCheckin/CheckInLogoutPage";
import CancelPasswordResetPage from "./Pages/ContactLogPages/EducationCheckin/CancelPasswordResetPage";
import OrganizationCheckInPage from "./Pages/ContactLogPages/EducationCheckin/OrganizationCheckInPage";
import ActiveCheckInPage from "./Pages/ContactLogPages/EducationCheckin/ActiveCheckInPage";
import CheckOutPage from "./Pages/ContactLogPages/EducationCheckin/CheckOutPage";
import ScanPage from "./Pages/ContactLogPages/EducationCheckin/ScanPage";
import PurchasePage from "./Pages/PurchasePage";
import OrganizationPage from "./Pages/OrganizationPages";
import { ConnectedProps, connect } from "react-redux";
import IState from "./Store/IState";
import { addToast, removeToast } from "./Store/Toast/actions";
import OrganizationLoginPage from "./Pages/ContactLogPages/EducationCheckin/OrganizationLoginPage";

class AppRouter extends React.Component<Props, IAppRouterState> {
    constructor(props: Props) {
        super(props);
        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
    }

    render() {
        return (
            <Router history={AppHistory}>
                <Toast />
                <Switch>
                    <Route path="/purchase/:product" render={
                        (props) => (
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <PurchasePage showSuccess={this.showSuccess} {...props} />
                            </AuthenticateActiveSession>
                        )
                    }/>
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
                        <AuthenticateActiveSession to="/login" showError={this.showError}>
                            <DashboardPage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/marketplace">
                        <AuthenticateActiveSession to="/login" showError={this.showError}>
                            <MarketplacePage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/spam">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <SpamRegistrationPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/settings">
                        <AuthenticateActiveSession to="/login" showError={this.showError}>
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
                    <Route exact path="/organizations">
                        <AuthenticateActiveSession to="/login" showError={this.showError}>
                            <OrganizationPage />
                        </AuthenticateActiveSession>
                    </Route>
                    <Route exact path="/check-in/:organizationId/login" render={
                        (props) => (
                            <UnauthenticatedAccessWrapper to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                <OrganizationLoginPage showSuccess={this.showSuccess} {...props} />
                            </UnauthenticatedAccessWrapper>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/login-password" render={
                        (props) => (
                            <UnauthenticatedAccessWrapper to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                <PINLoginPage {...props} />
                            </UnauthenticatedAccessWrapper>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/verify-account" render={
                        (props) => (
                            <UnauthenticatedAccessWrapper to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                <VerifyPINPage showSuccess={this.showSuccess} {...props} />
                            </UnauthenticatedAccessWrapper>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/reset-password" render={
                        (props) => (
                            <UnauthenticatedAccessWrapper to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                <ResetPINPage showSuccess={this.showSuccess} {...props} />
                            </UnauthenticatedAccessWrapper>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/logout" render={
                        (props) => (
                            <AuthenticateActiveSession to={`/check-in/${props.match.params.organizationId}/login`} showError={this.showError}>
                                <CheckInLogoutPage showSuccess={this.showSuccess} {...props} />
                            </AuthenticateActiveSession>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/cancel-recover" render={
                        (props) => (
                            <UnauthenticatedAccessWrapper to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                <CancelPasswordResetPage showSuccess={this.showSuccess} {...props} />
                            </UnauthenticatedAccessWrapper>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/active-check-in" render={
                        (props) => (
                            <AuthenticateActiveSession showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                <ActiveCheckInPage showSuccess={this.showSuccess} {...props} />
                            </AuthenticateActiveSession>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/check-out" render={
                        (props) => (
                            <AuthenticateActiveSession showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                <CheckOutPage showSuccess={this.showSuccess} {...props} />
                            </AuthenticateActiveSession>
                        )
                    }/>
                    <Route path="/check-in/:organizationId/scan/:building" render={
                        (props) => (
                            <AuthenticateActiveSession showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login?building=${props.match.params.building}`}>
                                <ScanPage showError={this.showError} showSuccess={this.showSuccess} {...props} />
                            </AuthenticateActiveSession>
                        )
                    }/>
                    <Route exact path="/check-in/:organizationId/" render={
                        (props) => (
                            <AuthenticateActiveSession showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                <OrganizationCheckInPage showSuccess={this.showSuccess} {...props} />
                            </AuthenticateActiveSession>
                        )
                    }/>
                    <Route exact path="/help">
                        <AuthenticateActiveSession to="/login" showError={this.showError}>
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
        const toast = this.props.addToast(message, ToastType.Error)
        setTimeout(() => {
            this.props.removeToast(toast.id)
        }, time); 
    }

    private showSuccess(message: string, time: number) {
        const toast = this.props.addToast(message, ToastType.Success)
        setTimeout(() => {
            this.props.removeToast(toast.id)
        }, time); 
    }
}

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(AppRouter)