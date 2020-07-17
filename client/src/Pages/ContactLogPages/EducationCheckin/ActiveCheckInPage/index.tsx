import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import CheckInTimer from "../../../../Components/CheckInTimer";
import Cookie from "../../../../lib/Cookie";
import LegalContainer from "../../LegalContainer";
import Button from "../../../../Components/Button";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IActiveCheckInPageProps from "./IActiveCheckInPageProps";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import IActiveCheckInPageState from "./IActiveCheckInPageState";
import OrganizationName from "../../OrganizationName";
import CheckOutRequest from "../../../../API/CheckOutRequest";
import AppHistory from "../../../../AppHistory";

export default class ActiveCheckInPage extends React.Component<IActiveCheckInPageProps, IActiveCheckInPageState> {
    constructor(props : IActiveCheckInPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            send: false
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onCheckOut = this.onCheckOut.bind(this);
        this.onError = this.onError.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Active Check In">
                <CheckOutRequest
                    send={this.state.send}
                    redirect
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onCheckOut}
                    onError={this.onError} />
                <GetOrganizationNameRequest
                    send
                    organizationId={this.props.match.params.organizationId}
                    onComplete={this.onOrganizationName} />
                <Logo dark />
                <OrganizationName>{`Currently at ${this.state.organizationName}`}</OrganizationName>
                <CheckInTimer startTime={new Date(Cookie.getCookie("timeCheckedIn") as string)} />
                <Button onClick={this.onClick} dark>Check Out</Button>
                <LegalContainer />
            </PageLayout>
        )
    }

    onClick() {
        this.setState({
            send: true
        })
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({ organizationName : response.data.organizationName })
    }

    onCheckOut() {
        this.props.showSuccess("Successfully checked out", 3000)
        Cookie.eraseCookie("checkInId")
        Cookie.eraseCookie("timeCheckedIn")
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }

    onError() {
        this.setState({
            send: false
        })
    }
}