import React from "react";
import SlideSwitch from "../../../../../Components/SlideSwitch";
import NumberInput from "../../../../../Components/NumberInput";
import IconType from "../../../../../Components/Icon/IconTypes";

export default class DisplayInput extends React.Component {
    render() {
        return (
            <>
                <SlideSwitch optionWidth={100} onChange={() => {}}>
                    <span>Wall</span>
                    <span>Table</span>
                    <span>Standing</span>
                </SlideSwitch>
                <NumberInput 
                    id="wall-displays"
                    onChange={() => {}} 
                    label={"Wall Displays"}
                    placeHolder={"Enter wall displays for this location"}
                    icon={IconType.Image} />
                <NumberInput 
                    id="table-displays"
                    onChange={() => {}} 
                    label={"Table Displays"}
                    placeHolder={"Enter table displays for this location"}
                    icon={IconType.Image} />
                <NumberInput 
                    id="standing-displays"
                    onChange={() => {}} 
                    label={"Standing Displays"}
                    placeHolder={"Enter standing displays for this location"}
                    icon={IconType.Image} />
            </>
        )
    }
}