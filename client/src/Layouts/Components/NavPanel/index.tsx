import React from "react";
import "./index.css";
import Logo from "../../../Components/Logo";
import NavPanelLinks from "./NavPanelLinks";
import NavPanelProfile from "./NavPanelProfile";
import NavPanelCollapseButton from "./NavPanelCollapseButton";
import { connect, ConnectedProps } from "react-redux";
import { INavPanel } from "../../../Store/NavPanel/types";
import IState from "../../../Store/IState";
import Icon from "../../../Components/Icon";
import IconType from "../../../Components/Icon/IconTypes";
import { toggleNavPanelCollapseAction, toggleNavPanelHideAction } from "../../../Store/NavPanel/actions"

class NavPanel extends React.Component<Props> {
    render() {
        return (
            <div className={`dashboard-nav-panel ${this.getCollapsedClass()} ${this.getHiddenClass()}`}>
                <div onClick={this.props.toggleHidden}>
                    <Icon color="#b1b1b3" icon={IconType.HamburgerMenu} />
                </div>
                <div className={this.getContainerClass()}>
                    <Logo collapsed={this.props.collapsed} dark horizontal />
                    <NavPanelCollapseButton collapsed={this.props.collapsed} onClick={this.props.toggleCollapse} />
                    <NavPanelLinks collapsed={this.props.collapsed} />
                    <NavPanelProfile />
                </div>
            </div>
        )
    }

    private getCollapsedClass() {
        return this.props.collapsed ? 
            "dashboard-nav-panel-collapsed" : 
            ""
    }

    private getHiddenClass() {
        return this.props.hidden ?
            "dashboard-nav-panel-hidden" :
            ""
    }

    private getContainerClass() {
        return this.props.hidden ?
            "dashboard-nav-panel-content-hidden" :
            "dashboard-nav-panel-content"
    }
}

const mapState = (state : IState) => {
    return {
        user: state.user,
        collapsed: state.navPanel.collapsed,
        hidden: state.navPanel.hidden
    }
}

const mapDispatch = {
    toggleCollapse: () => toggleNavPanelCollapseAction(),
    toggleHidden: () => toggleNavPanelHideAction()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & INavPanel

export default connector(NavPanel)