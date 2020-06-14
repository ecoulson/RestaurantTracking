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

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={AppHistory}>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route path="/verify">
                        <VerifyAccountPage />
                    </Route>
                    <Route exact path="/">
                        <App />
                    </Route>
                </Switch>
            </Router>
        )
    }
}