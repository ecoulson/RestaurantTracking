import React from "react";
import "./index.css";

export default class WidgetTitle extends React.Component {
    render() {
        return <h1 className="widget-title">{this.props.children}</h1>
    }
}