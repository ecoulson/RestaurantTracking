import React from "react";
import IconMapping from "./IconMapping";
import IFormIconProps from "./IIconProps";
import "./Icon.css";

export default class Icon extends React.Component<IFormIconProps> {
    render() {
        return <img className="icon" src={IconMapping.get(this.props.icon)}></img>
    }
}