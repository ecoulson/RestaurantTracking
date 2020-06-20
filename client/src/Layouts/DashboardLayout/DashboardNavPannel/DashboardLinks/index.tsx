import React from "react";
import DashboardLinksData from "./DashboardLinksData";
import DashboardLink from "./DashboardLink";

export default class DashboardLinks extends React.Component {
    render() {
        return DashboardLinksData.map((link) => {
            return <DashboardLink
                icon={link.icon}
                iconColor={link.iconColor}
                to={link.to}>
                    {link.text}
            </DashboardLink>
        })
    }
}