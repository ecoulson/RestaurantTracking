import React from "react";
import ICheckInLayoutProps from "./ICheckInLayoutProps";
import PageLayout from "../PageLayout";
import CheckInBackground from "./CheckInBackground";
import CheckInHeader from "./CheckInHeader";
import CheckInFooter from "./CheckInFooter";
import CheckInMenu from "./CheckInMenu";
import "./index.css"

export default class CheckInLayout extends React.Component<ICheckInLayoutProps> {
    render() {
        return (
            <PageLayout pageTitle={this.props.pageTitle}>
                <CheckInBackground>
                    <CheckInMenu organizationId={this.props.organizationId} />
                    <div className="check-in-page">
                        <CheckInHeader organizationId={this.props.organizationId} />
                        {this.props.children}
                        <CheckInFooter />
                    </div>
                </CheckInBackground>
            </PageLayout>
        )
    }
}