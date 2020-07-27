import React from "react";
import IScanPageProps from "./IScanPageProps";
import IScanPageState from "./IScanPageState";
import OrganizationName from "../../OrganizationName";
import Instructions from "../../Instructions";
import Cookie from "../../../../lib/Cookie";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetCheckInRequest from "../../../../API/GetCheckInRequest";
import ICheckInResponse from "../../../../API/CheckInRequest/ICheckInResponse";
import AppHistory from "../../../../AppHistory";
import CheckOutRequest from "../../../../API/CheckOutRequest";
import CheckInRequest from "../../../../API/CheckInRequest";
import CheckInLayout from "../../../../Layouts/CheckInLayout";

export default class ScanPage extends React.Component<IScanPageProps, IScanPageState> {
    constructor(props : IScanPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            isCheckedIn: false,
            checkOut: false,
            shouldCheckIn: false
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onGetCheckIn = this.onGetCheckIn.bind(this);
        this.onCheckOutError = this.onCheckOutError.bind(this);
        this.onCheckOut = this.onCheckOut.bind(this);
        this.onCheckIn = this.onCheckIn.bind(this);
        this.onCheckInError = this.onCheckInError.bind(this);
    }

    componentWillMount() {
        if (Cookie.getCookie("checkInId")) {
            this.setState({
                isCheckedIn: true
            })
        }
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Checking In...">
                <CheckOutRequest
                    send={this.state.checkOut}
                    onError={this.onCheckOutError}
                    onComplete={this.onCheckOut}
                    checkInId={Cookie.getCookie("checkInId") as string} />
                <GetCheckInRequest
                    send={this.state.isCheckedIn}
                    checkInId={Cookie.getCookie("checkInId") as string}
                    onComplete={this.onGetCheckIn} />
                <GetOrganizationNameRequest
                    send
                    organizationId={this.props.match.params.organizationId}
                    onComplete={this.onOrganizationName} />
                <CheckInRequest
                    send={this.state.shouldCheckIn}
                    organizationId={this.props.match.params.organizationId}
                    building={this.props.match.params.building}
                    timeCheckedIn={new Date()}
                    onComplete={this.onCheckIn}
                    onError={this.onCheckInError}
                    />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Instructions>Checking into <b>{this.getBuildingName()}</b>...</Instructions>
            </CheckInLayout>
        )
    }

    getBuildingName() {
        let words = this.props.match.params.building.split("-");
        words = words.map((word) => {
            return `${word.substring(0, 1).toUpperCase()}${word.substring(1, word.length).toLowerCase()}`; 
        })
        return words.join(" ")
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName,
            shouldCheckIn: !this.state.isCheckedIn
        })
    }

    onCheckOutError() {
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/active-check-in`)
    }

    onCheckOut() {
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }

    onGetCheckIn() {
        this.setState({
            checkOut: true
        })
    }

    onCheckIn(response : IResponse<ICheckInResponse>) {
        Cookie.setCookie("checkInId", response.data._id, 2);
        Cookie.setCookie("timeCheckedIn", response.data.timeCheckedIn, 2);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/active-check-in`)
    }

    onCheckInError() {
        this.props.showError(`Failed to check in to ${this.getBuildingName()}`, 5000)
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }
}