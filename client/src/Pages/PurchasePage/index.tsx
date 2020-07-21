import React from "react"
import BasicLayout from "../../Layouts/BasicLayout"
import OrganizationRegistrationPage from "./OrganizationRegistration"

export default class PurchasePage extends React.Component {
    render() {
        return (
            <BasicLayout title="Organization Setup">
                <OrganizationRegistrationPage />
            </BasicLayout>
        )
    }
}