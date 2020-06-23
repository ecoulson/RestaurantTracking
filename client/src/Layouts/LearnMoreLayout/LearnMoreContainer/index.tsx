import React from "react";
import "./index.css";
import DashboardTitle from "../../DashboardLayout/DashboardTitle";
import ILearnMoreContainerProps from "./ILearnMoreContainerProps";

export default class LearnMoreContainer extends React.Component<ILearnMoreContainerProps> {
    render() {
        return (
            <div className="learn-more-container">
                <DashboardTitle>{this.props.title}</DashboardTitle>
                <div className="learn-more-grid">
                    {this.props.children}
                </div>
            </div>
        )
    }
}