import React from "react";
import IOverviewMediaProps from "./IOverviewMediaProps";
import "./index.css";

export default class OverviewMedia extends React.Component<IOverviewMediaProps> {
    render() {
        return (
            <img alt="A brightly lit restaurant" className="overview-media-image" src={this.props.mediaLink} />
        )
    }
}