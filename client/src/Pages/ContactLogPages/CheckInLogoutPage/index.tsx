import React from "react";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import ICheckInLogoutPageProps from "./ICheckInLogoutPageProps";
import CheckInTitle from "../Components/CheckInTitle";
import OrganizationName from "../Components/OrganizationName";

export default class CheckInLogoutPage extends React.Component<ICheckInLogoutPageProps> {
    componentDidMount() {
        Cookie.eraseCookie("checkInId");
        Cookie.eraseCookie("timeCheckedIn");
        Cookie.eraseCookie("token");
        Cookie.eraseCookie("pin_email");
        this.props.showSuccess("Successfully logged out", 3000);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`);
    }

    render() {
        return (
            <>
                <OrganizationName organizationId={this.props.match.params.organizationId} />
                <CheckInTitle>Logging Out</CheckInTitle>
            </>
        )
    }
}