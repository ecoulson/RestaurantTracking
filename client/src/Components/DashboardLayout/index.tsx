import React from "react";
import DashboardNavPannel from "./DashboardNavPannel";
import DashboardContainer from "./DashboardContainer";

export default class DashboardLayout extends React.Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <DashboardNavPannel />
                <DashboardContainer>
                    {this.props.children}
                </DashboardContainer>
            </div>
        )
    }
}