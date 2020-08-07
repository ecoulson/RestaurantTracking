import React from "react";
import ILearnMoreLayoutProps from "../../Layouts/LearnMoreLayout/ILearnMoreLayoutProps";

const LearnMoreLayout = React.lazy(() => import("../../Layouts/LearnMoreLayout"));

export default function AboutProductRoute(props : ILearnMoreLayoutProps) {
    return (
        <LearnMoreLayout {...props} />
    )
}