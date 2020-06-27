import React from "react";
import "./index.css"

export default class BasicSection extends React.Component {
    render() {
        return (
            <div className="basic-section">
                {this.props.children}
            </div>
        )
    }
}