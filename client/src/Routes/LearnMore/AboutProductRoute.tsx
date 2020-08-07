import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

const LearnMoreLayout = React.lazy(() => import("../../Layouts/LearnMoreLayout"));

export default function AboutProductRoute() {
    let { path } = useRouteMatch();

    return (
        <Route exact path={`${path}/:product/`} render={
            (props) => <LearnMoreLayout {...props} />
        }/>
    )
}