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
import CheckInLayout from "./Layouts/CheckInLayout";
import AppIsActive from "./Components/AuthenticationWrappers/AppIsActive";
import { AppType } from "./Store/Cart/types";
import VerifyCodePage from "./Pages/ContactLogPages/VerifyCodePage";

const HomeRoute = React.lazy(() => import("./Routes/Home/HomeRoute"))
const LearnMoreRoute = React.lazy(() => import("./Routes/LearnMore/LearnMoreRoute"));

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
const ResetPINPage = React.lazy(() => import("./Pages/ContactLogPages/ResetPINPage"));
const CheckInLogoutPage = React.lazy(() => import("./Pages/ContactLogPages/CheckInLogoutPage"));
const CancelPasswordResetPage = React.lazy(() => import("./Pages/ContactLogPages/CancelPasswordResetPage"));
const OrganizationCheckInPage = React.lazy(() => import("./Pages/ContactLogPages/OrganizationCheckInPage"));
const ActiveCheckInPage = React.lazy(() => import("./Pages/ContactLogPages/ActiveCheckInPage"));
const CheckOutPage = React.lazy(() => import("./Pages/ContactLogPages/CheckOutPage"));
const ScanPage = React.lazy(() => import("./Pages/ContactLogPages/ScanPage"));
const PurchasePage = React.lazy(() => import("./Pages/PurchasePage"));
const OrganizationPage = React.lazy(() => import("./Pages/OrganizationPages"));
const OrganizationLoginPage = React.lazy(() => import("./Pages/ContactLogPages/OrganizationLoginPage"));
const VerifyPINAccountPage = React.lazy(() => import("./Pages/ContactLogPages/VerifyPINAccountPage"));
const InActiveAppPage = React.lazy(() => import("./Pages/ContactLogPages/InActiveAppPage"));
const SyncPage = React.lazy(() => import("./Pages/ContactLogPages/SyncPage"));
const VerifyAnonymousAccountPage = React.lazy(() => import("./Pages/ContactLogPages/VerifyAnonymousAccountPage"));

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
                            <LearnMoreRoute />
                        </Route>
                        
                        {/* <Route path="/purchase/:product" render={
                            (props) => (
                                <AuthenticateActiveSession to="/login" showError={this.showError}>
                                    <Suspense fallback={<BasicLayout title="Loading..." />}>
                                        <PurchasePage 
                                            showError={this.showError}
                                            showSuccess={this.showSuccess} 
                                            {...props} />
                                    </Suspense>
                                </AuthenticateActiveSession>
                            )
                        }/>
                        <Route path="/legal/:documentName" render={
                            (props) => (
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
                                    <LegalPage {...props} />
                                </Suspense>
                            )
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
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
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
                        <Route exact path="/check-in/:organizationId/login" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <UnauthenticatedAccessWrapper unverified to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <OrganizationLoginPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </UnauthenticatedAccessWrapper>
                                </AppIsActive>
                                
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/verify-account" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <VerifyPINAccountPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/verify-code" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <VerifyCodePage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/reset-password" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <UnauthenticatedAccessWrapper unverified to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <ResetPINPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </UnauthenticatedAccessWrapper>
                                </AppIsActive>
                                
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/logout" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                        <CheckInLogoutPage showSuccess={this.showSuccess} {...props} />
                                    </Suspense>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/cancel-recover" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <UnauthenticatedAccessWrapper unverified to={`/check-in/${props.match.params.organizationId}`} showError={this.showError}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <CancelPasswordResetPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </UnauthenticatedAccessWrapper>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/active-check-in" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <ActiveCheckInPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/verify" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <VerifyAnonymousAccountPage {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/sync" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <SyncPage {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/check-out" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <CheckOutPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route path="/check-in/:organizationId/scan/:building" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                        <ScanPage showError={this.showError} showSuccess={this.showSuccess} {...props} />
                                    </Suspense>
                                </AppIsActive>
                                
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/" render={
                            (props) => (
                                <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
                                    <AuthenticateActiveSession unverified showError={this.showError} to={`/check-in/${props.match.params.organizationId}/login`}>
                                        <Suspense fallback={<CheckInLayout organizationId={props.match.params.organizationId} pageTitle="Loading..." />}>
                                            <OrganizationCheckInPage showSuccess={this.showSuccess} {...props} />
                                        </Suspense>
                                    </AuthenticateActiveSession>
                                </AppIsActive>
                            )
                        }/>
                        <Route exact path="/check-in/:organizationId/inactive" render={
                            (props) => (
                                <Suspense fallback={<div></div>}>
                                    <InActiveAppPage />
                                </Suspense>
                            )
                        }/>
                        <Route exact path="/help">
                            <AuthenticateActiveSession to="/login" showError={this.showError}>
                                <Suspense fallback={<BasicLayout title="Loading..." />}>
                                    <HelpPage />
                                </Suspense>
                            </AuthenticateActiveSession>
                        </Route> */}
                        
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