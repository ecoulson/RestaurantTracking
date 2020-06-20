import React from "react";
import DashboardNavPannel from "./DashboardNavPannel";
import DashboardContainer from "./DashboardContainer";
import IDashboardLayoutProps from "./IDashboardLayoutProps";
import DashboardTitle from "./DashboardTitle";

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <DashboardNavPannel />
                <DashboardContainer title={this.props.title}>
                    {this.props.children}
                </DashboardContainer>
            </div>
        )
    }
}