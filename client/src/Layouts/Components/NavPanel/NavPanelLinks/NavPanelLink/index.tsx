import React from "react";
import "./index.css";
import INavLinkProps from "./INavLinkProps";
import Icon from "../../../../../Components/Icon";
import { Link } from "react-router-dom";
import INavLinkState from "./INavLinkState";

export default class NavPanelLink extends React.Component<INavLinkProps, INavLinkState> {
    constructor(props: INavLinkProps) {
        super(props);
        this.state = {
            hovered: false
        }

        this.toggleHover = this.toggleHover.bind(this)
    }

    render() {
        return (
            <Link 
                className={`dashboard-link ${this.getCollapsedClass()}`} 
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                to={this.props.to}>
                <Icon 
                    hovered={this.state.hovered} 
                    icon={this.props.icon} 
                    hoverColor={this.props.hoverColor}
                    color={this.props.iconColor} />
                <span 
                    className={`dashboard-link-text ${this.getTextCollapsedClass()}`}>
                    {this.props.children}
                </span>
            </Link>
        )
    }

    private toggleHover() {
        this.setState({
            hovered: !this.state.hovered
        })
    }

    private getCollapsedClass() {
        return this.props.collapsed ?
            "dashboard-link-collapsed" : "";
    }

    private getTextCollapsedClass() {
        return this.props.collapsed ?
            "dashboard-link-text-collapsed" : "";
    }
}