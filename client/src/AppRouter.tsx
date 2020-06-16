import React from "react";
import {
    // BrowserRouter as Router,
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

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={AppHistory}>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/spam">
                        <SpamRegistrationPage />
                    </Route>
                    <Route exact path="/cancel-recover">
                        <CancelPasswordRecoveryPage />
                    </Route>
                    <Route exact path="/confirm-recover">
                        <ConfirmPasswordRecoveryPage />
                    </Route>
                    <Route exact path="/reset-password">
                        <ResetPasswordPage />
                    </Route>
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                    <Route exact path="/verify">
                        <VerifyAccountPage />
                    </Route>
                    <Route exact path="/verification">
                        <VerificationPage />
                    </Route>
                    <Route exact path="/register">
                        <UserRegistrationPage />
                    </Route>
                    <Route exact path="/forgot-password">
                        <ForgotPasswordPage />
                    </Route>
                    <Route exact path="/">
                        <App />
                    </Route>
                </Switch>
            </Router>
        )
    }
}