import React, { Suspense } from "react";
import ILearnMoreLayoutProps from "../../Layouts/LearnMoreLayout/ILearnMoreLayoutProps";

const PriceEstimatorPage = React.lazy(() => import("../../Pages/PriceEstimatorPage"));

export default function PriceEstimatorRoute(props : ILearnMoreLayoutProps) {    
    return (
        <Suspense fallback={<div></div>}>
            <PriceEstimatorPage 
                showError={() => {}}
                showSuccess={() => {}} 
                {...props} />
        </Suspense>
    )
}