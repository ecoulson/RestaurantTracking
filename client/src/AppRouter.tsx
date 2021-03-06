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
import AuthenticateActiveSession from "./Components/AuthenticationWrappers/AuthenticateActiveSession";
import BasicLayout from "./Layouts/BasicLayout";
import AuthenticationLayout from "./Layouts/AuthenticationLayout";

const HomeRoute = React.lazy(() => import("./Routes/Home/HomeRoute"))
const LearnMoreRoute = React.lazy(() => import("./Routes/LearnMore/LearnMoreRoute"));
const PurchaseRoute = React.lazy(() => import("./Routes/Purchase/PurchaseRoute"));
const LegalRoute = React.lazy(() => import("./Routes/Legal/LegalRoute"));
const CheckInRoutes = React.lazy(() => import("./Routes/CheckInApp/CheckInRoutes"));

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
const OrganizationPage = React.lazy(() => import("./Pages/OrganizationPages"));

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
                        <Route exact path="/">
                            <HomeRoute />
                        </Route>
                        <Route path="/learn-more">
                            <LearnMoreRoute 
                                showSuccess={this.showSuccess} 
                                showError={this.showError} />
                        </Route>
                        <Route path="/purchase">
                            <PurchaseRoute 
                                showSuccess={this.showSuccess} 
                                showError={this.showError} />
                        </Route>
                        <Route path="/legal">
                            <LegalRoute />
                        </Route>
                        <Route 
                            path="/check-in/:organizationId" 
                            render={props => <CheckInRoutes 
                                                showError={this.showError} 
                                                showSuccess={this.showSuccess} 
                                                {...props} />
                        }/>
                        <Route exact path="/login">
                            <UnauthenticatedAccessWrapper to="/dashboard" showError={this.showError}>
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <Login/>
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/dashboard">
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
                                    <DashboardPage />
                                </Suspense>
                            </AuthenticateActiveSession>
                        </Route>
                        <Route exact path="/marketplace">
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
                                    <MarketplacePage />
                                </Suspense>
                            </AuthenticateActiveSession>
                        </Route>
                        <Route exact path="/spam">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <SpamRegistrationPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/settings">
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <UserProfilePage />
                                </Suspense>
                            </AuthenticateActiveSession>
                        </Route>
                        <Route exact path="/cancel-recover">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <CancelPasswordRecoveryPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/confirm-recover">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <ConfirmPasswordRecoveryPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/reset-password">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <ResetPasswordPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/logout">
                            <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                <Logout showSuccess={this.showSuccess}/>
                            </Suspense>
                        </Route>
                        <Route exact path="/verify">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <VerifyAccountPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/verification">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <VerificationPage showSuccess={this.showSuccess}/>
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/register">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <UserRegistrationPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/forgot-password">
                            <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                                <Suspense fallback={<AuthenticationLayout pageTitle="Loading..." />}>
                                    <ForgotPasswordPage />
                                </Suspense>
                            </UnauthenticatedAccessWrapper>
                        </Route>
                        <Route exact path="/organizations">
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
                                    <OrganizationPage />
                                </Suspense>
                            </AuthenticateActiveSession>
                        </Route>
                        <Route exact path="/help">
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
                                    <HelpPage />
                                </Suspense>
                            </AuthenticateActiveSession>
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