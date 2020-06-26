import React from "react";
import DashboardNavPanel from "./DashboardNavPanel";
import DashboardContainer from "./DashboardContainer";
import IDashboardLayoutProps from "./IDashboardLayoutProps";

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <DashboardNavPanel />
                <DashboardContainer title={this.props.title}>
                    {this.props.children}
                </DashboardContainer>
            </div>
        )
    }
}