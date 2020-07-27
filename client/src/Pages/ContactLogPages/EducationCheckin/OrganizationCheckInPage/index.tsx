import React from "react";
import IOrganizationCheckInPageProps from "./IOrganizationCheckInPageProps";
import IOrganizationCheckInState from "./IOrganizationCheckInState";
import OrganizationName from "../../OrganizationName";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import Form from "../../../../Components/Form";
import Button from "../../../../Components/Button";
import Instructions from "../../Instructions";
import SlideSwitch from "../../../../Components/SlideSwitch";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";
import BuildingDropdown from "../../../../Components/BuildingDropdown";
import IBuilding from "../../../../API/GetBuildingsRequest/IBuilding";
import BuildingType from "../../../../Components/BuildingDropdown/BuildingType";
import CheckInRequest from "../../../../API/CheckInRequest";
import AppHistory from "../../../../AppHistory";
import ICheckInResponse from "../../../../API/CheckInRequest/ICheckInResponse";
import Cookie from "../../../../lib/Cookie";
import CheckInLayout from "../../../../Layouts/CheckInLayout";

export default class OrganizationCheckInPage extends React.Component<IOrganizationCheckInPageProps, IOrganizationCheckInState> {
    constructor(props: IOrganizationCheckInPageProps) {
        super(props);
        this.state = {
            organizationName: "Organization",
            dropdownInputType: 0,
            send: false,
            building: null
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBuildingChange = this.handleBuildingChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle={`${this.state.organizationName} Check In`}>
                <CheckInRequest 
                    send={this.state.send}
                    onError={this.onError}
                    onComplete={this.onComplete}
                    building={this.state.building ? this.state.building.name : ""}
                    organizationId={this.props.match.params.organizationId}
                    timeCheckedIn={new Date()}
                    />
                <GetOrganizationNameRequest
                    send 
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId}/>
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <SlideSwitch onChange={this.handleChange}>
                        <Icon icon={IconType.OpenMenu} color="white" />
                        <Icon icon={IconType.Home} color="white" />
                    </SlideSwitch>
                    {this.getDropdown()}
                    <Instructions>Find a building and check in.</Instructions>
                    <Button dark submit>Check In</Button>
                </Form>
            </CheckInLayout>
        )
    }

    private handleChange(dropdownInputType : number) {
        this.setState({ dropdownInputType });
    }

    private getDropdown() {
        return this.state.dropdownInputType === 0 ?
            <BuildingDropdown 
                type={BuildingType.Academic} 
                organizationId={this.props.match.params.organizationId}
                onChange={this.handleBuildingChange} /> :
            <BuildingDropdown 
                type={BuildingType.Residential}
                organizationId={this.props.match.params.organizationId}
                onChange={this.handleBuildingChange} />
    }

    private handleBuildingChange(building : IBuilding) {
        this.setState({ building })
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({ organizationName: response.data.organizationName })
    }

    onSubmit() {
        if (this.state.building) {
            this.setState({
                send: true
            })
        }
    }

    onComplete(response : IResponse<ICheckInResponse>) {
        Cookie.setCookie("checkInId", response.data._id, 2);
        Cookie.setCookie("timeCheckedIn", response.data.timeCheckedIn, 2);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/active-check-in`)
    }

    onError() {
        this.setState({
            send: false
        })
    }
}