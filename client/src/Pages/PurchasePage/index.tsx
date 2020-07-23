import React from "react"
import BasicLayout from "../../Layouts/BasicLayout"
import OrganizationRegistrationPage from "./OrganizationRegistration"
import IPurchasePageProps from "./IPurchasePageProps"
import ContactLogsPurchase from "./PurchaseContactLogsPage"

export default class PurchasePage extends React.Component<IPurchasePageProps> {
    render() {
        switch(this.props.match.params.product) {
            case "organization-setup":
                return (
                    <OrganizationRegistrationPage showSuccess={this.props.showSuccess} />
                )
            case "contact-logs":
                return (
                    <ContactLogsPurchase />
                )
            default:
                return (
                    <BasicLayout title="Not Found">
                    </BasicLayout>
                )
        }
    }
}