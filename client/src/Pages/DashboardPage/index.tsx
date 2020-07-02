import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Widget from "../../Components/Widget";

export default class DashboardPage extends React.Component {
    componentDidMount() {
        document.title = "Dashboard"
    }

    render() {
        return (
            <DashboardLayout title="Dashboard">
                <Widget columns={3} rows={1}>
                    
                </Widget>
            </DashboardLayout>
        )
    }
}