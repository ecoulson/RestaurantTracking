import React from "react";
import "./StatusIcon.css";
import IStatusIconProps from "./IStatusIconProps";
import Status from "../Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class StatusIcon extends React.Component<IStatusIconProps> {
    render() {
        return (
            <FontAwesomeIcon className="status-icon" size="10x" icon={this.getIcon()} />
        )
    }

    private getIcon() {
        switch (this.props.status) {
            case Status.SUCCESS:
                return "check-circle";
            case Status.FAILURE:
                return "times-circle";
            default:
                throw new Error("Unexpected page state")
        }
    }
}