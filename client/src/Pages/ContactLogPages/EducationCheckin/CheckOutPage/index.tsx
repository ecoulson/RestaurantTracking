import React from "react";
import ICheckOutPageProps from "./ICheckOutPageProps";
import Cookie from "../../../../lib/Cookie";
import AppHistory from "../../../../AppHistory";
import OrganizationName from "../../OrganizationName";
import CheckOutRequest from "../../../../API/CheckOutRequest";
import CheckInLayout from "../../../../Layouts/CheckInLayout";

export default class CheckOutPage extends React.Component<ICheckOutPageProps> {
    constructor(props: ICheckOutPageProps) {
        super(props);
        this.onCheckOut = this.onCheckOut.bind(this);
    }

    componentWillMount() {
        if (!Cookie.hasCookie("checkInId")) {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`);
        }
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Check Out Page">
                <CheckOutRequest
                    send
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onCheckOut} />
                <OrganizationName>Checking Out</OrganizationName>
            </CheckInLayout>
        )
    }

    onCheckOut() {
        this.props.showSuccess("Successfully checked out", 3000)
        Cookie.eraseCookie("timeCheckedIn")
        Cookie.eraseCookie("checkInId")
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }
}