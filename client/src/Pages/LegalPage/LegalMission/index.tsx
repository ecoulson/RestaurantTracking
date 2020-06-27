import React from "react";
import "./index.css"

export default class LegalMission extends React.Component {
    render() {
        return (
            <h3 className="legal-document-mission">{this.props.children}</h3>
        )
    }
}