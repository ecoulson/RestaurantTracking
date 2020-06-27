import React from "react";
import "./Title.css";

export default class Title extends React.Component {
    render() {
        return (
            <h1 className="status-title">{this.props.children}</h1>
        )
    }
}