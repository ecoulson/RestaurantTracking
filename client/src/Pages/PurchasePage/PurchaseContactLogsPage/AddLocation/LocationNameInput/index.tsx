import React from "react";
import IconType from "../../../../../Components/Icon/IconTypes";
import ILocationNameInputProps from "./ILocationNameInputProps";
import TextInput from "../../../../../Components/TextInput";

export default class LocationNameInput extends React.Component<ILocationNameInputProps> {
    render() {
        return (
            <TextInput 
                label="Location"
                icon={IconType.BuildingSolid}
                iconColor="black"
                hoverColor="grey"
                id="location-name"
                placeholder="Enter location name..."
                name="location-name"
                onChange={this.props.onChange} />
        )
    }
}