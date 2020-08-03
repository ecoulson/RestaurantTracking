import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import ICheckInNotificationMenuProps from "./ICheckInNotificationMenuProps";
import ICheckInNotificationMenuState from "./ICheckInNotificationMenuState";

export default class CheckInNotificationMenu extends React.Component<ICheckInNotificationMenuProps, ICheckInNotificationMenuState> {
    constructor(props : ICheckInNotificationMenuProps) {
        super(props);
        this.state = {
            hasRendered: false
        }
    }

    render() {
        return (
            <div className={`check-in-notification-menu ${this.getClass()}`}>
                <Link className="check-in-notification-menu-item" to="/check-in/org/verify-sync">
                    Click to verify or sync your account to save your check-ins.
                </Link>
            </div>
        )
    }

    getClass() {
        if (this.state.hasRendered) {
            return this.props.isVisible ?
                "check-in-notification-menu-show" :
                "check-in-notification-menu-hide"
        }
        return ""
    }

    componentDidUpdate() {
        if (this.state.hasRendered || this.props.isVisible) {
            if (!this.state.hasRendered) {
                this.setState({
                    hasRendered: true
                })
            }
        }
    }
}