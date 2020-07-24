import React from "react";
import ICheckInLayoutProps from "./ICheckInLayoutProps";
import PageLayout from "../PageLayout";
import CheckInBackground from "./CheckInBackground";
import CheckInHeader from "./CheckInHeader";
import CheckInFooter from "./CheckInFooter";
import CheckInMenu from "./CheckInMenu";

export default class CheckInLayout extends React.Component<ICheckInLayoutProps> {
    render() {
        return (
            <PageLayout pageTitle={this.props.pageTitle}>
                <CheckInBackground>
                    <CheckInMenu organizationId={this.props.organizationId} />
                    <CheckInHeader />
                    {this.props.children}
                    <CheckInFooter />
                </CheckInBackground>
            </PageLayout>
        )
    }
}