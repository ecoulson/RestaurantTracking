import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const PriceEstimatorRoute = React.lazy(() => import("./PriceEstimatorRoute"));
const AboutProductRoute = React.lazy(() => import("./AboutProductRoute"));

export default function LearnMoreRoute() {
    return (
        <Suspense fallback={<div></div>}>
            <Route path="/learn-more">
                <AboutProductRoute />
                <PriceEstimatorRoute />
            </Route>
        </Suspense>
    )
}