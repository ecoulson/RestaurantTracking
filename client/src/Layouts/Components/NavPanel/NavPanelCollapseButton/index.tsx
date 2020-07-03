import React from "react";
import "./index.css";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";
import INavPanelCollapseButtonProps from "./INavPanelCollapseButtonProps";

export default class NavPanelCollapseButton extends React.Component<INavPanelCollapseButtonProps> {
    render() {
        return (
            <div id="collapse-button" onClick={this.props.onClick} className={this.getClass()}>
                {
                    !this.props.collapsed ?
                        <Icon color="#b1b1b3" icon={IconType.ChevronLeft} /> :
                        <Icon color="#b1b1b3" icon={IconType.ChevronRight} /> 
                }
            </div>
        )
    }

    private getClass() {
        return this.props.collapsed ?
            "nav-panel-collapse-button-collapsed" :
            "nav-panel-collapse-button"
    }
}