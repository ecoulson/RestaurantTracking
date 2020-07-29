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

export default class AddLocation extends React.Component {
    constructor(props: {}) {
        super(props);
        this.onDisplayInput = this.onDisplayInput.bind(this);
    }

    render() {
        return (
            <Wrapper>
                <LocationNameInput onChange={() => {}} />
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

    onDisplayInput(counts: [string, number][]) {
        console.log(counts);
    }
}