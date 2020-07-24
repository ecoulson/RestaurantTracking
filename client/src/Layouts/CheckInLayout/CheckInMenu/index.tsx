import React from "react";
import CheckInMenuContainer from "./CheckInMenuContainer";
import CheckInMenuClose from "./CheckInMenuClose";
import ICheckInMenuProps from "./ICheckInMenuProps";
import CheckInMenuLogoutContainer from "./CheckInMenuLogoutContainer";
import GetOrganizationNameRequest from "../../../API/GetOrganizationNameRequest";
import ICheckInMenuState from "./ICheckInMenuState";
import IResponse from "../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import CheckInMenuTitle from "./CheckInMenuTitle";
import CheckInMenuLinksContainer from "./CheckInMenuLinksContainer";

export default class CheckInMenu extends React.Component<ICheckInMenuProps, ICheckInMenuState> {
    constructor(props : ICheckInMenuProps) {
        super(props);
        this.state = {
            send: false,
            organizationName: ""
        }
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <CheckInMenuContainer>
                <GetOrganizationNameRequest 
                    send
                    onError={this.onError}
                    onComplete={this.onComplete}
                    organizationId={this.props.organizationId} />
                <CheckInMenuTitle>{this.state.organizationName}</CheckInMenuTitle>
                <CheckInMenuLinksContainer organizationId={this.props.organizationId} />
                <CheckInMenuClose />
                <CheckInMenuLogoutContainer organizationId={this.props.organizationId} />
            </CheckInMenuContainer>
        )
    }

    onComplete(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            send: true,
            organizationName: response.data.organizationName
        })
    }

    onError() {
        this.setState({
            send: false
        })
    }
}