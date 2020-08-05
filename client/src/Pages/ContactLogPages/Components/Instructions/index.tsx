import React from "react";
import "./Instructions.css";

export default class Instructions extends React.Component {
    render() {
        return (
            <h2 className="instructions">{this.props.children}</h2>
        )
    }
}