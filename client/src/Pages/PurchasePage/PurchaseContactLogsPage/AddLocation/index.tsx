import React from "react";
import "./index.css"
import TextInput from "../../../../Components/TextInput";
import IconType from "../../../../Components/Icon/IconTypes";
import SlideSwitch from "../../../../Components/SlideSwitch";
import NumberInput from "../../../../Components/NumberInput";
import Button from "../../../../Components/Button";
import Wrapper from "./Wrapper";
import LocationNameInput from "./LocationNameInput";
import DisplayInput from "./DisplayInput";
import IAddLocationState from "./IAddLocationState";

export default class AddLocation extends React.Component<{}, IAddLocationState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            location: "",
            counts: []
        }
        this.onDisplayInput = this.onDisplayInput.bind(this);
        this.onLocationNameChange = this.onLocationNameChange.bind(this);
    }

    render() {
        return (
            <Wrapper>
                <LocationNameInput onChange={this.onLocationNameChange} />
                <DisplayInput onChange={this.onDisplayInput} displayTypes={["wall", "table", "standing"]} />
                <Button>Add Location</Button>
            </Wrapper>
        )
    }

    getInput() {
        return (
            <NumberInput 
                id="wall-displays"
                onChange={() => {}} 
                label={"Wall Displays"}
                placeHolder={"Enter wall displays for this location"}
                icon={IconType.Image} />
        )
    }

    onLocationNameChange(location: string) {
        this.setState({ location });
    }

    onDisplayInput(counts: [string, number][]) {
        this.setState({ counts });
    }
}