import React from "react";
import ICheckOutPageProps from "./ICheckOutPageProps";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import OrganizationName from "../Components/OrganizationName";
import CheckOutRequest from "../../../API/CheckOutRequest";
import CheckInTitle from "../Components/CheckInTitle";

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
            <>
                <CheckOutRequest
                    send
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onCheckOut} />
                <OrganizationName organizationId={this.props.match.params.organizationId}/>
                <CheckInTitle>Checking Out</CheckInTitle>
            </>
        )
    }

    onCheckOut() {
        Cookie.eraseCookie("timeCheckedIn")
        Cookie.eraseCookie("checkInId")
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }
}