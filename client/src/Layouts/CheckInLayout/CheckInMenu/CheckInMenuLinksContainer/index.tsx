import React from 'react';
import "./index.css";
import Cookie from '../../../../lib/Cookie';
import { Link } from 'react-router-dom';
import IResponse from '../../../../API/IResponse';
import IGetBuildingResponse from '../../../../API/GetBuildingsRequest/IGetBuildingsResponse';
import ICheckInMenuLinksContainerProps from './ICheckInMenuLinksContainerProps';
import IState from '../../../../Store/IState';
import { toggleCheckInMenuHideAction } from '../../../../Store/CheckInMenu/actions';
import { connect, ConnectedProps } from 'react-redux';

class CheckInMenuLinksContainer extends React.Component<Props> {
    constructor(props : Props) {
        super(props);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <div className="check-in-menu-links-container">
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
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/active-check-in`}>
                    Active Check In
                </Link>
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/check-out`}>
                    Check Out
                </Link>
            </>
        )
    }

    renderInactiveLinks() {
        return (
            <>
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/`}>
                    Home
                </Link>
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/manual-check-in`}>
                    Manual Check In / Check Out
                </Link>
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/settings`}>
                    My Profile
                </Link>
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/`}>
                    About Us
                </Link>
            </>
        )
    }

    onComplete(response : IResponse<IGetBuildingResponse>) {
        this.setState({
            buildings: response.data.buildings
        })
    }
}

const mapState = (state : IState) => {
    return {
        hidden: state.checkInMenu.hidden
    }
}

const mapDispatch = {
    hide: () => toggleCheckInMenuHideAction()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & ICheckInMenuLinksContainerProps;

export default connector(CheckInMenuLinksContainer)