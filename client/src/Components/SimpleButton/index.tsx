import React from "react";
import "./index.css";

export default class SimpleButton extends React.Component {
    render() {
        return <button className="simple-button">{this.props.children}</button>
    }
}