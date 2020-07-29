import React from "react";
import DashboardContainer from "./DashboardContainer";
import IDashboardLayoutProps from "./IDashboardLayoutProps";
import NavPanel from "../Components/NavPanel";
import PageLayout from "../PageLayout";
import LegalFooter from "../Components/LegalFooter";

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
    render() {
        return (
            <PageLayout pageTitle={this.props.title}>
                <div style={{ display: "flex" }}>
                    <NavPanel />
                    <div className="dashboard-wrapper">
                        <DashboardContainer title={this.props.title}>
                            {this.props.children}
                        </DashboardContainer>
                        <LegalFooter />
                    </div>
                </div>
            </PageLayout>
        )
    }
}