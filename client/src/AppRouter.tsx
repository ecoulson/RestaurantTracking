import React, { Suspense } from "react";
import {
    Switch,
    Route,
    Router
} from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";
import IState from "./Store/IState";
import { addToast, removeToast } from "./Store/Toast/actions";
import AppHistory from "./AppHistory";
import IAppRouterState from "./IAppRouterState";
import Toast from "./Components/Toast";
import ToastType from "./Components/Toast/ToastType";
import UnauthenticatedAccessWrapper from "./Components/AuthenticationWrappers/UnauthenticatedAccessWrapper";
import LearnMoreLayout from "./Layouts/LearnMoreLayout";
import AuthenticateActiveSession from "./Components/AuthenticationWrappers/AuthenticateActiveSession";

const Login = React.lazy(() => import("./Pages/AuthenticationPages/Login"));
const Logout = React.lazy(() => import("./Pages/AuthenticationPages/Logout"));
const VerifyAccountPage = React.lazy(() => import("./Pages/AuthenticationPages/VerifyAccountPage"));
const VerificationPage = React.lazy(() => import("./Pages/AuthenticationPages/VerificationPage"));
const UserRegistrationPage = React.lazy(() => import("./Pages/AuthenticationPages/UserRegistrationPage"));
const ForgotPasswordPage = React.lazy(() => import("./Pages/AuthenticationPages/ForgotPasswordPage"));
const SpamRegistrationPage = React.lazy(() => import("./Pages/AuthenticationPages/SpamRegistrationPage"));
const CancelPasswordRecoveryPage = React.lazy(() => import("./Pages/AuthenticationPages/CancelPasswordRecoveryPage"));
const ConfirmPasswordRecoveryPage = React.lazy(() => import("./Pages/AuthenticationPages/ConfirmPasswordRecoveryPage"));
const ResetPasswordPage = React.lazy(() => import("./Pages/AuthenticationPages/ResetPasswordPage"));
const DashboardPage = React.lazy(() => import("./Pages/DashboardPage"));
const MarketplacePage = React.lazy(() => import("./Pages/MarketplacePage"));
const UserProfilePage = React.lazy(() => import("./Pages/UserProfilePage"));
const HelpPage = React.lazy(() => import("./Pages/HelpPage"));
const LegalPage = React.lazy(() => import("./Pages/LegalPage"));
const ResetPINPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/ResetPINPage"));
const CheckInLogoutPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/CheckInLogoutPage"));
const CancelPasswordResetPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/CancelPasswordResetPage"));
const OrganizationCheckInPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/OrganizationCheckInPage"));
const ActiveCheckInPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/ActiveCheckInPage"));
const CheckOutPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/CheckOutPage"));
const ScanPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/ScanPage"));
const PurchasePage = React.lazy(() => import("./Pages/PurchasePage"));
const OrganizationPage = React.lazy(() => import("./Pages/OrganizationPages"));
const OrganizationLoginPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/OrganizationLoginPage"));
const VerifyPINPage = React.lazy(() => import("./Pages/ContactLogPages/EducationCheckin/OrganizationLoginPage/VerifyPINPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));

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
                <Suspense fallback={<div />}>
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
                                <Login/>
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
                </Suspense>
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