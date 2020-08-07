import { Route, useRouteMatch } from "react-router-dom";
import React, { Suspense } from "react";

const PriceEstimatorPage = React.lazy(() => import("../../Pages/PriceEstimatorPage"));

export default function PriceEstimatorRoute() {
    let { path } = useRouteMatch();
    
    return (
        <Route exact path={`${path}/:product/price-estimator`} render={
            (props) => (
                <Suspense fallback={<div></div>}>
                    <PriceEstimatorPage 
                        showError={() => {}}
                        showSuccess={() => {}} 
                        {...props} />
                </Suspense>
            )
        }/>
    )
}