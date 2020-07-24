import React from "react";
import IQuickCheckInLinksProps from "./IQuickCheckInLinksProps";
import { Link } from "react-router-dom";
import "./index.css"
import IState from "../../../../../Store/IState";
import { connect, ConnectedProps } from "react-redux";
import { toggleCheckInMenuHideAction } from "../../../../../Store/CheckInMenu/actions";

class QuickCheckInLinks extends React.Component<Props> {
    render() {
        return (
            <>
                <h3 className="quick-links-title">Quick Check In</h3>
                {this.renderQuickLinks()}
            </>
        )
    }

    renderQuickLinks() {
        return this.props.buildings.map((building) => {
            return (
                <Link onClick={this.props.hide} className="quick-link check-in-menu-link" to={`/check-in/${this.props.organizationId}/scan/${building.name.split(" ").join("-")}`}>
                    {building.name}
                </Link>
            )
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

type Props = PropsFromRedux & IQuickCheckInLinksProps;

export default connector(QuickCheckInLinks)