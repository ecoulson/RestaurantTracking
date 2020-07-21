import React from "react";
import Form from "../../../Components/Form";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import "./index.css";
import TextInput from "../../../Components/TextInput";
import IconType from "../../../Components/Icon/IconTypes";
import Button from "../../../Components/Button";

export default class OrganizationRegistrationPage extends React.Component {
    constructor(props : {}) {
        super(props);
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onOrganizationId = this.onOrganizationId.bind(this);
    }

    render() {
        return (
            <div className="organization-registration-page">
                <BasicSectionTitle>Organization Information</BasicSectionTitle>
                <Form>
                    <TextInput
                        icon={IconType.Users}
                        iconColor="#AAAAAA"
                        hoverColor="#232C47"
                        isValid={true}
                        placeholder="Enter organization name..."
                        label="Organization Name"
                        onChange={this.onOrganizationName} />
                    <TextInput
                        icon={IconType.Link}
                        iconColor="#AAAAAA"
                        hoverColor="#232C47"
                        placeholder="Enter organization ID..."
                        label="Organization ID"
                        onChange={this.onOrganizationId} />
                </Form>
                <Button submit>Continue</Button>
            </div>
        )
    }

    onOrganizationName(organizationName : string) {
        console.log(organizationName);
    }

    onOrganizationId(organizationId : string) {
        console.log(organizationId);
    }
}