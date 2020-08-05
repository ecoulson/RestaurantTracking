import React from "react";
import IconType from "../../../../../../Components/Icon/IconTypes";
import ILocationNameInputProps from "./ILocationNameInputProps";
import TextInput from "../../../../../../Components/TextInput";

export default class LocationNameInput extends React.Component<ILocationNameInputProps> {
    render() {
        return (
            <TextInput 
                label="Location"
                ref={this.props.inputRef}
                icon={IconType.BuildingSolid}
                hoverColor="black"
                iconColor="grey"
                isValid={true}
                id="location-name"
                placeholder="Enter location name..."
                name="location-name"
                onChange={this.props.onChange} />
        )
    }
}