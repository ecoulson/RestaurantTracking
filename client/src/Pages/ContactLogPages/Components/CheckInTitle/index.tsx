import React from "react";
import "./index.css";

export default class CheckInTitle extends React.Component {
    render() {
        return <h1 className="check-in-title">{this.props.children}</h1>
    }
}