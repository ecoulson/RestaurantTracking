import React from "react";
import IQuickCheckInLinksProps from "./IQuickCheckInLinksProps";
import { Link } from "react-router-dom";
import "./index.css"

export default class QuickCheckInLinks extends React.Component<IQuickCheckInLinksProps> {
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
                <Link className="quick-link check-in-menu-link" to={`/check-in/${this.props.organizationId}/scan/${building.name.split(" ").join("-")}`}>
                    {building.name}
                </Link>
            )
        })
    }
}