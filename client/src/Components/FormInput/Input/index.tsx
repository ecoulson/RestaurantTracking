import React from "react";
import "./Input.css";
import IInputProps from "./IInputProps";

export default class Input extends React.Component<IInputProps> {
    render() {
        return (
            <input
                value={this.props.value}
                className="form-raw-input" 
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                type={this.props.type} />
        )
    }
}