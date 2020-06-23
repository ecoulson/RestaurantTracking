import React from "react";
import "./index.css";
import IDashboardLinkProps from "./IDashboardLinkProps";
import Icon from "../../../../../Components/Icon";
import { Link } from "react-router-dom";

export default class DashboardLink extends React.Component<IDashboardLinkProps> {
    render() {
        return (
            <Link className="dashboard-link" to={this.props.to}>
                <Icon icon={this.props.icon} color={this.props.iconColor} />
                <span className="dashboard-link-text">{this.props.children}</span>
            </Link>
        )
    }
}