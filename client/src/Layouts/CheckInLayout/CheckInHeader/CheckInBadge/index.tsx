import React from "react";
import "./index.css";
import ICheckInBadgeProps from "./ICheckInBadgeProps";

export default class CheckInBadge extends React.Component<ICheckInBadgeProps> {
    render() {
        return (
            <div className={`check-in-badge ${this.getClass()}`}>
                <span className="check-in-badge-count">!</span>
            </div>
        )
    }

    getClass() {
        return this.props.isVisible ?
            "check-in-badge-show" :
            "check-in-badge-hide"
    }
}