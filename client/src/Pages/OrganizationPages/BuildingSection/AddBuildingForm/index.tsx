import React from "react";
import Form from "../../../../Components/Form";
import LearnMoreSubtitle from "../../../LearnMorePage/LearnMoreSubtitle";
import TextInput from "../../../../Components/TextInput";
import IconType from "../../../../Components/Icon/IconTypes";

export default class AddBuildingForm extends React.Component {
    render() {
        return (
            <Form>
                <LearnMoreSubtitle>Add Building</LearnMoreSubtitle>
                <TextInput 
                    label="Building Name"
                    placeholder="Building name..."
                    name="building-name"
                    isValid={true}
                    icon={IconType.BuildingSolid}
                    iconColor="#b1b1b3"
                    hoverColor="white"
                    id="building-name"
                    onChange={this.onBuildingNameChange} />
            </Form>
        )
    }

    onBuildingNameChange() {
        
    }
}