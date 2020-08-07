import React from "react";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import ICheckInLogoutPageProps from "./ICheckInLogoutPageProps";
import OrganizationName from "../Components/OrganizationName";
import CheckInLayout from "../../../Layouts/CheckInLayout";
import CheckInTitle from "../Components/CheckInTitle";

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
                <CheckInTitle>Logging Out</CheckInTitle>
            </>
        )
    }
}