import React from "react"
import BasicLayout from "../../Layouts/BasicLayout"
import OrganizationRegistrationPage from "./OrganizationRegistration"
import IPurchasePageProps from "./IPurchasePageProps"

export default class PurchasePage extends React.Component<IPurchasePageProps> {
    render() {
        return (
            <BasicLayout title="Organization Setup">
                <OrganizationRegistrationPage showSuccess={this.props.showSuccess} />
            </BasicLayout>
        )
    }
}