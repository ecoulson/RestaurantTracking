import React from "react";
import TextInput from "../../../../../../Components/TextInput";
import IconType from "../../../../../../Components/Icon/IconTypes";
import IOrganizationNameInputProps from "./IOrganizationNameInputProps";

export default class OrganizationNameInput extends React.Component<IOrganizationNameInputProps> { 
    render() {
        return (
            <TextInput
                id="organization"
                isValid={true}
                autocomplete="organization"
                name="organization"
                icon={IconType.Users}
                iconColor="#AAAAAA"
                hoverColor="#232C47"
                placeholder="Organization name..."
                label="Organization Name"
                onChange={this.props.onChange} />
        )
    }
}