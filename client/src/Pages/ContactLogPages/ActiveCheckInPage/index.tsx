import React from "react";
import CheckInTimer from "../../../Components/CheckInTimer";
import Cookie from "../../../lib/Cookie";
import Button from "../../../Components/Button";
import IActiveCheckInPageProps from "./IActiveCheckInPageProps";
import IResponse from "../../../API/IResponse";
import IActiveCheckInPageState from "./IActiveCheckInPageState";
import OrganizationName from "../Components/OrganizationName";
import CheckOutRequest from "../../../API/CheckOutRequest";
import AppHistory from "../../../AppHistory";
import GetCheckInRequest from "../../../API/GetCheckInRequest";
import ICheckInResponse from "../../../API/CheckInRequest/ICheckInResponse";
import CheckInLayout from "../../../Layouts/CheckInLayout";

export default class ActiveCheckInPage extends React.Component<IActiveCheckInPageProps, IActiveCheckInPageState> {
    constructor(props : IActiveCheckInPageProps) {
        super(props);
        this.state = {
            building: "",
            send: false
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onCheckOut = this.onCheckOut.bind(this);
        this.onError = this.onError.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTick = this.onTick.bind(this);
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Active Check In">
                <CheckOutRequest
                    send={this.state.send}
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onCheckOut}
                    onError={this.onError} />
                <GetCheckInRequest
                    send
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onOrganizationName} />
                <OrganizationName>{`Currently at ${this.getBuildingName()} for`}</OrganizationName>
                <CheckInTimer onTick={this.onTick} startTime={new Date(Cookie.getCookie("timeCheckedIn") as string)} />
                <Button onClick={this.onClick} dark>Check Out</Button>
            </CheckInLayout>
        )
    }

    getBuildingName() {
        let words = this.state.building.split(" ");
        words = words.map((word) => {
            return `${word.substring(0, 1).toUpperCase()}${word.substring(1, word.length).toLowerCase()}`; 
        });
        return words.join(" ")
    }

    onTick(duration : moment.Duration) {
        if (duration.asDays() > 1) {
            this.setState({
                send: true
            })
        }
    }

    onClick() {
        this.setState({
            send: true
        })
    }

    onOrganizationName(response : IResponse<ICheckInResponse>) {
        this.setState({ building : response.data.building })
    }

    onCheckOut() {
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