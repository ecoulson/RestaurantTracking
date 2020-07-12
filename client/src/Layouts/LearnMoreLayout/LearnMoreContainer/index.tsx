import React from "react";
import "./index.css";
import DashboardTitle from "../../DashboardLayout/DashboardTitle";
import ILearnMoreContainerProps from "./ILearnMoreContainerProps";
import LegalFooter from "../../Components/LegalFooter";

export default class LearnMoreContainer extends React.Component<ILearnMoreContainerProps> {
    render() {
        return (
            <div className="learn-more-container">
                <div className="learn-more-wrapper">
                    <DashboardTitle>{this.props.title}</DashboardTitle>
                    <div className="learn-more-grid">
                        {this.props.children}
                    </div>
                    <LegalFooter />
                </div>
            </div>
        )
    }
}