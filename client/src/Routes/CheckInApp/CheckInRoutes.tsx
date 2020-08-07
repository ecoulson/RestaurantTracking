import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import ICheckInRoute from "./ICheckInRouteProps";
import CheckInLayout from "../../Layouts/CheckInLayout";
import IRouteProps from "../IRouteProps";
import { AppType } from "../../Store/Cart/types";
import AppIsActive from "../../Components/AuthenticationWrappers/AppIsActive";

const LoginRoute = React.lazy(() => import("./LoginRoute"));
const VerifyAccountRoute = React.lazy(() => import("./VerifyAccountRoute"));
const VerifyCodeRoute = React.lazy(() => import("./VerifyCodeRoute"));
const ResetPasswordRoute = React.lazy(() => import("./ResetPasswordRoute"));
const LogoutRoute = React.lazy(() => import("./LogoutRoute"));
const CancelRecoverRoute = React.lazy(() => import("./CancelRecoverRoute"));
const ActiveCheckInRoute = React.lazy(() => import("./ActiveCheckInRoute"));
const VerifyAnonymousRoute = React.lazy(() => import("./VerifyRoute"));
const SyncRoute = React.lazy(() => import("./SyncRoute"));
const ScanRoute = React.lazy(() => import("./ScanRoute"));
const HomeRoute = React.lazy(() => import("./HomeRoute"));
const CheckOutRoute = React.lazy(() => import("./CheckOutRoute"));
const InActiveRoute = React.lazy(() => import("./InActiveRoute"));

export default function CheckInRoutes(props : ICheckInRoute & IRouteProps) {
    const { path } = useRouteMatch();

    return (
        <AppIsActive appType={AppType.ContactLogs} organizationId={props.match.params.organizationId}>
            <CheckInLayout pageTitle="Check In" organizationId={props.match.params.organizationId}>
                <Switch>
                    <Route exact path={path}>
                        <HomeRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/login`}>
                        <LoginRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/logout`}>
                        <LogoutRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/verify`}>
                        <VerifyAnonymousRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/verify-account`}>
                        <VerifyAccountRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/verify-code`}>
                        <VerifyCodeRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/sync`}>
                        <SyncRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/reset-password`}>
                        <ResetPasswordRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/cancel-recover`}>
                        <CancelRecoverRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/active-check-in`}>
                        <ActiveCheckInRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/check-out`}>
                        <CheckOutRoute {...props} />
                    </Route>
                    <Route exact path={`${path}/scan:building`} render={
                        routeProps => <ScanRoute 
                                            {...routeProps} 
                                            showError={props.showError} 
                                            showSuccess={props.showSuccess} />
                    }/>
                    <Route exact path={`${path}/inactive`}>
                        <InActiveRoute {...props} />
                    </Route>
                </Switch>
            </CheckInLayout>
        </AppIsActive>
    )
}