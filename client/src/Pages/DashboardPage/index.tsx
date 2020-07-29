import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Widget from "../../Components/Widget";
import Button from "../../Components/Button";
import AppHistory from "../../AppHistory";
import WidgetTitle from "../../Components/WidgetTitle";

export default class DashboardPage extends React.Component {
    render() {
        return (
            <DashboardLayout title="Dashboard">
                <Widget columns={5} rows={2}>
                    <WidgetTitle>Get Started</WidgetTitle>
                    <p>Start by setting up your business, institution, or organization</p>
                    <Button onClick={() => AppHistory.push("/marketplace")}>Visit Marketplace</Button>
                </Widget>
            </DashboardLayout>
        )
    }
}