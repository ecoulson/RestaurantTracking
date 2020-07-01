import React from "react";
import DashboardContainer from "./DashboardContainer";
import IDashboardLayoutProps from "./IDashboardLayoutProps";
import NavPanel from "../Components/NavPanel";

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <NavPanel />
                <DashboardContainer title={this.props.title}>
                    {this.props.children}
                </DashboardContainer>
            </div>
        )
    }
}