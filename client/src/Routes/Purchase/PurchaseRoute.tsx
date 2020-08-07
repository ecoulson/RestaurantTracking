import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AuthenticateActiveSession from "../../Components/AuthenticationWrappers/AuthenticateActiveSession";
import IRouteProps from "../IRouteProps";

const PurchaseProductRoute = React.lazy(() => import("./PurchaseProductRoute"));

export default function PurchaseRoute(props : IRouteProps) {
    const { path } = useRouteMatch();

    return (
        <AuthenticateActiveSession to="/login" showError={props.showError}>
            <Switch>
                <Route 
                    path={`${path}/:product`} render={
                    routeProps => <PurchaseProductRoute {...routeProps} {...props}/>}/>
            </Switch>
        </AuthenticateActiveSession>
    )
}