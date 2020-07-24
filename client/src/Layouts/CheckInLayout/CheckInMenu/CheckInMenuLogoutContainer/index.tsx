import React from "react";
import { Link } from "react-router-dom";
import ICheckInMenuLogoutContainerProps from "./ICheckInMenuLogoutContainerProps";
import "./index.css";

export default class CheckInMenuLogoutContainer extends React.Component<ICheckInMenuLogoutContainerProps> {
    render() {
        return (
            <div className="check-in-menu-logout-container">
                <Link className="check-in-menu-link" to={`/check-in/${this.props.organizationId}/logout`}>Logout</Link>
            </div>
        )
    }
}