import React from "react";
import "./index.css"

export default class CheckInMenuTitle extends React.Component {
    render() {
        return (
            <h1 className="check-in-menu-title">{this.props.children}</h1>
        )
    }
}