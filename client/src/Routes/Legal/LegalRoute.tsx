import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const LegalPage = React.lazy(() => import("../../Pages/LegalPage"));

export default function LegalRoute() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route
                path={`${path}/:documentName`}
                render={routeProps => <LegalPage {...routeProps} />}/>
        </Switch>
    )
}