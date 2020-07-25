import React from "react";
import { Link } from "react-router-dom";
import ICheckInMenuLogoutContainerProps from "./ICheckInMenuLogoutContainerProps";
import "./index.css";
import IState from "../../../../Store/IState";
import { toggleCheckInMenuHideAction } from "../../../../Store/CheckInMenu/actions";
import { connect, ConnectedProps } from "react-redux";

class CheckInMenuLogoutContainer extends React.Component<Props> {
    render() {
        return (
            <div className="check-in-menu-logout-container">
                <Link onClick={this.props.hide} className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/logout`}>Logout</Link>
            </div>
        )
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

type Props = PropsFromRedux & ICheckInMenuLogoutContainerProps;

export default connector(CheckInMenuLogoutContainer)