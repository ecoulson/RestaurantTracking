import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import IScanPageProps from "./IScanPageProps";
import IScanPageState from "./IScanPageState";
import OrganizationName from "../../OrganizationName";
import Instructions from "../../Instructions";
import LegalContainer from "../../LegalContainer";
import Cookie from "../../../../lib/Cookie";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetCheckInRequest from "../../../../API/GetCheckInRequest";
import ICheckInResponse from "../../../../API/CheckInRequest/ICheckInResponse";
import AppHistory from "../../../../AppHistory";
import CheckOutRequest from "../../../../API/CheckOutRequest";
import CheckInRequest from "../../../../API/CheckInRequest";

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
        } else {
            this.setState({
                shouldCheckIn: true
            })
        }
    }

    render() {
        return (
            <PageLayout pageTitle="Checking In...">
                <CheckOutRequest
                    send={this.state.checkOut}
                    redirect
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
                    send 
                    organizationId={this.props.match.params.organizationId}
                    building={this.props.match.params.building}
                    timeCheckedIn={new Date()}
                    onComplete={this.onCheckIn}
                    onError={this.onCheckInError}
                    />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Instructions>Checking into <b>{this.getBuildingName()}</b>...</Instructions>
                <LegalContainer />
            </PageLayout>
        )
    }

    getBuildingName() {
        const building = this.props.match.params.building
        return building.substring(0, 1).toUpperCase() + building.substring(1, building.length).toLowerCase()
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }

    onCheckOutError() {
        this.props.showError("Please check out before signing in elsewhere", 5000);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/active-check-in`)
    }

    onCheckOut() {
        this.setState({
            shouldCheckIn: true
        })
    }

    onGetCheckIn(response : IResponse<ICheckInResponse>) {
        if (response.data.building.toLowerCase() === this.props.match.params.building.toLowerCase()) {
            this.setState({
                checkOut: true
            })
        } else {
            this.props.showError("Please check out before signing in elsewhere", 5000);
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/active-check-in`)
        }
    }

    onCheckIn(response : IResponse<ICheckInResponse>) {
        this.props.showSuccess(`Successfully checked in to ${this.getBuildingName()}`, 5000)
        Cookie.setCookie("checkInId", response.data._id);
        Cookie.setCookie("timeCheckedIn", response.data.timeCheckedIn);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/active-check-in`)
    }

    onCheckInError() {
        this.props.showError(`Failed to check in to ${this.getBuildingName()}`, 5000)
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }
}