import React from "react";
import {
    // BrowserRouter as Router,
    Switch,
    Route,
    Router
} from "react-router-dom";
import App from "./App";
import Login from "./Components/Login";
import AppHistory from "./AppHistory";

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={AppHistory}>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/verify">
                        <h1>Verify Account Page</h1>
                    </Route>
                    <Route exact path="/">
                        <App />
                    </Route>
                </Switch>
            </Router>
        )
    }
}