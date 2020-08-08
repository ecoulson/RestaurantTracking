import React, { Suspense } from "react";
import IPriceEstimatorPageProps from "../../Pages/PriceEstimatorPage/IPriceEstimatorPageProps";

const PriceEstimatorPage = React.lazy(() => import("../../Pages/PriceEstimatorPage"));

export default function PriceEstimatorRoute(props : IPriceEstimatorPageProps) {    
    return (
        <Suspense fallback={<div></div>}>
            <PriceEstimatorPage {...props} />
        </Suspense>
    )
}