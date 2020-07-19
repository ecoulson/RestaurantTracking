import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import ICheckOutPageProps from "./ICheckOutPageProps";
import Cookie from "../../../../lib/Cookie";
import AppHistory from "../../../../AppHistory";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import LegalContainer from "../../LegalContainer";
import CheckOutRequest from "../../../../API/CheckOutRequest";

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
            <PageLayout pageTitle="Check Out Page">
                <CheckOutRequest
                    send
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onCheckOut} />
                <Logo dark />
                <OrganizationName>Checking Out</OrganizationName>
                <LegalContainer />
            </PageLayout>
        )
    }

    onCheckOut() {
        this.props.showSuccess("Successfully checked out", 3000)
        Cookie.eraseCookie("timeCheckedIn")
        Cookie.eraseCookie("checkInId")
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }
}