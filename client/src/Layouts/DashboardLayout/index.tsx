import React from "react";
import DashboardContainer from "./DashboardContainer";
import IDashboardLayoutProps from "./IDashboardLayoutProps";
import NavPanel from "../Components/NavPanel";
import PageLayout from "../PageLayout";

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
    render() {
        return (
            <PageLayout pageTitle={this.props.title}>
                <div style={{ display: "flex" }}>
                    <NavPanel />
                    <div className="dashboard-layout">
                        <div className="dashboard-wrapper">
                            <DashboardContainer title={this.props.title}>
                                {this.props.children}
                            </DashboardContainer>
                        </div>
                    </div>
                </div>
            </PageLayout>
        )
    }
}