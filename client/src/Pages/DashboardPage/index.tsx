import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Widget from "../../Components/Widget";
import Submit from "../../Components/Submit";

export default class DashboardPage extends React.Component {
    render() {
        return (
            <DashboardLayout title="Dashboard">
                <Widget columns={2} rows={1}>
                    
                </Widget>
            </DashboardLayout>
        )
    }
}