import React from "react";
import "./Input.css";
import IInputProps from "./IInputProps";

export default class Input extends React.Component<IInputProps> {
    render() {
        return (
            <input 
                className="form-raw-input" 
                placeholder={this.props.placeholder} 
                type={this.props.type} />
        )
    }
}