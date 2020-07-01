import React from "react";
import NavLinksData from "./NavLinksData";
import NavPanelLink from "./NavPanelLink";
import INavPanelLinksProps from "./INavPanelLinksProps";

export default class NavPanelLinks extends React.Component<INavPanelLinksProps> {
    render() {
        return NavLinksData.map((link, i) => {
            return <NavPanelLink
                collapsed={this.props.collapsed}
                key={i}
                icon={link.icon}
                hoverColor={link.hoverColor}
                iconColor={link.iconColor}
                to={link.to}>
                    {link.text}
            </NavPanelLink>
        })
    }
}