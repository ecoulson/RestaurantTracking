import React from "react";
import "./StatusIcon.css";
import IStatusIconProps from "./IStatusIconProps";
import Status from "../Status";

export default class StatusIcon extends React.Component<IStatusIconProps> {
    render() {
        return (
            <i className={`${this.getIcon()} status-icon`} />
        )
    }

    private getIcon() {
        switch (this.props.status) {
            case Status.SUCCESS:
                return "far fa-10x fa-check-circle"
            case Status.FAILURE:
                return "far fa-10x fa-times-circle"
        }
    }
}