import React from "react";
import "./index.css";
import Logo from "../../../Components/Logo";
import NavPanelLinks from "./NavPanelLinks";
import NavPanelProfile from "./NavPanelProfile";
import NavPanelCollapseButton from "./NavPanelCollapseButton";
import { connect, ConnectedProps } from "react-redux";
import { INavPanel, NavPanelActions } from "../../../Store/NavPanel/types";
import IState from "../../../Store/IState";

class NavPanel extends React.Component<Props> {
    render() {
        return (
            <div className={`dashboard-nav-panel ${this.getCollapsedClass()}`}>
                <Logo collapsed={this.props.collapsed} dark horizontal />
                <NavPanelCollapseButton collapsed={this.props.collapsed} onClick={this.props.toggleCollapse} />
                <NavPanelLinks collapsed={this.props.collapsed} />
                <NavPanelProfile collapsed={this.props.collapsed} />
            </div>
        )
    }

    private getCollapsedClass() {
        return this.props.collapsed ? 
            "dashboard-nav-panel-collapsed" : 
            ""
    }
}

const mapState = (state : IState) => {
    return {
        collapsed: state.navPanel.collapsed
    }
}

const mapDispatch = {
    toggleCollapse: () => ({
        type: NavPanelActions.TOGGLE_COLLAPSE
    })
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & INavPanel

export default connector(NavPanel)