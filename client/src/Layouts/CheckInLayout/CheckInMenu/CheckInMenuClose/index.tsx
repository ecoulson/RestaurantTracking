import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, ConnectedProps } from "react-redux";
import { toggleCheckInMenuHideAction } from "../../../../Store/CheckInMenu/actions";
import IState from "../../../../Store/IState";

class CheckInMenuClose extends React.Component<Props> {
    render() {
        return (
            <div onClick={this.props.hide} className="check-in-menu-close">
                <FontAwesomeIcon icon="times" color="black" size="2x"/>
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

type Props = PropsFromRedux;

export default connector(CheckInMenuClose)