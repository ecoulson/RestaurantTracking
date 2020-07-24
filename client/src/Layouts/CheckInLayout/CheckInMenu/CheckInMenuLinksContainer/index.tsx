import React from 'react';
import "./index.css";
import Cookie from '../../../../lib/Cookie';
import { Link } from 'react-router-dom';
import GetBuildingsRequest from '../../../../API/GetBuildingsRequest';
import IResponse from '../../../../API/IResponse';
import IGetBuildingResponse from '../../../../API/GetBuildingsRequest/IGetBuildingsResponse';
import QuickCheckInLinks from './QuickCheckInLinks';
import ICheckInMenuLinksContainerProps from './ICheckInMenuLinksContainerProps';
import ICheckInMenuLinksContainerState from './ICheckInMenuLinksContainerState';

export default class CheckInMenuLinksContainer extends React.Component<ICheckInMenuLinksContainerProps, ICheckInMenuLinksContainerState> {
    constructor(props : ICheckInMenuLinksContainerProps) {
        super(props);
        this.state = {
            buildings: []
        }
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <div className="check-in-menu-links-container">
                <GetBuildingsRequest
                    send={!Cookie.hasCookie("checkInId")}
                    organizationId={this.props.organizationId}
                    onComplete={this.onComplete.bind(this)}
                    />
                {this.getActiveCheckInLinks()}
            </div>
        )
    }

    getActiveCheckInLinks() {
        return Cookie.hasCookie("checkInId") ? 
            this.renderActiveLinks() :
            this.renderInactiveLinks()
    }

    renderActiveLinks() {
        return (
            <>
                <Link className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/active-check-in`}>
                    Active Check In
                </Link>
                <Link className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/check-out`}>
                    Check Out
                </Link>
            </>
        )
    }

    renderInactiveLinks() {
        return (
            <>
                <Link className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/`}>
                    Home
                </Link>
                <Link className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/manual-check-in`}>
                    Manual Check In / Check Out
                </Link>
                <QuickCheckInLinks organizationId={this.props.organizationId} buildings={this.state.buildings} />
            </>
        )
    }

    onComplete(response : IResponse<IGetBuildingResponse>) {
        this.setState({
            buildings: response.data.buildings
        })
    }
}