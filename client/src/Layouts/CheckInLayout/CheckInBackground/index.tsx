import React from "react";
import "./index.css";

export default class CheckInBackground extends React.Component {
    render() {
        return <div className="check-in-background">{this.props.children}</div>
    }
}