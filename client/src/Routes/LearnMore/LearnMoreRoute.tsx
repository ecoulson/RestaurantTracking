import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import IRouteProps from "../IRouteProps";

const PriceEstimatorRoute = React.lazy(() => import("./PriceEstimatorRoute"));
const AboutProductRoute = React.lazy(() => import("./AboutProductRoute"));

export default function LearnMoreRoute(props : IRouteProps) {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route 
                path={`${path}/:product/price-estimator`} 
                render={routeProps => <PriceEstimatorRoute {...props} {...routeProps} />}/>
            <Route 
                path={`${path}/:product/`} 
                render={routeProps => <AboutProductRoute {...routeProps} />}/>
        </Switch>
    )
}