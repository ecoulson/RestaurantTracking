import React from "react";
import {
    Switch,
    Route,
    Router
} from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import AppHistory from "./AppHistory";
import Logout from "./Pages/Logout";
import VerifyAccountPage from "./Pages/VerifyAccountPage";
import VerificationPage from "./Pages/VerificationPage";
import UserRegistrationPage from "./Pages/UserRegistrationPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import SpamRegistrationPage from "./Pages/SpamRegistrationPage";
import CancelPasswordRecoveryPage from "./Pages/CancelPasswordRecoveryPage";
import ConfirmPasswordRecoveryPage from "./Pages/ConfirmPasswordRecoveryPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import DashboardPage from "./Pages/DashboardPage";
import AuthenticateActiveSession from "./Components/AuthenticationWrappers/AuthenticateActiveSession";
import Toast from "./Components/Toast";
import ToastType from "./Components/Toast/ToastType";
import IAppRouterState from "./IAppRouterState";
import UnauthenticatedAccessWrapper from "./Components/AuthenticationWrappers/UnauthenticatedAccessWrapper";
import MarketplacePage from "./Pages/MarketplacePage";
import LearnMoreLayout from "./Layouts/LearnMoreLayout";

export default class AppRouter extends React.Component<{}, IAppRouterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: ""
        }
        this.showError = this.showError.bind(this);
    }

    render() {
        return (
            <Router history={AppHistory}>
                <Toast type={ToastType.Error} message={this.state.message} />
                <Switch>
                    <Route path="/learn-more/:product" render={
                        (props) => (
                            <AuthenticateActiveSession showError={this.showError}>
                                <LearnMoreLayout {...props} />
                            </AuthenticateActiveSession>
                        )
                    }>
                    </Route>
                    <Route exact path="/login">
                        <UnauthenticatedAccessWrapper to="/dashboard" showError={this.showError}>
                            <Login/>
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
                        <Logout/>
                    </Route>
                    <Route exact path="/verify">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <VerifyAccountPage />
                        </UnauthenticatedAccessWrapper>
                    </Route>
                    <Route exact path="/verification">
                        <UnauthenticatedAccessWrapper showError={this.showError} to="/dashboard">
                            <VerificationPage />
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
                    <Route exact path="/">
                        <App />
                    </Route>
                </Switch>
            </Router>
        )
    }

    private showError(message: string, time: number) {
        this.setState({ message })
        setTimeout(() => {
            this.setState({ message: "" })
        }, time); 
    }
}