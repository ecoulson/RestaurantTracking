import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const PriceEstimatorRoute = React.lazy(() => import("./PriceEstimatorRoute"));
const AboutProductRoute = React.lazy(() => import("./AboutProductRoute"));

export default function LearnMoreRoute() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${path}/:product/price-estimator`} render={
                (props) => (
                    <PriceEstimatorRoute {...props} />
                )
            }/>
            <Route path={`${path}/:product/`} render={
                (props) => (
                    <AboutProductRoute {...props} />
                )
            }/>
        </Switch>
    )
}