import React from "react";
import "./Input.css";
import IInputProps from "./IInputProps";

export default class Input extends React.Component<IInputProps> {
    render() {
        return (
            <input
                value={this.props.value}
                disabled={this.props.disabled}
                className="form-raw-input" 
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur ? this.props.onBlur : () => null}
                onFocus={this.props.onFocus ? this.props.onFocus : () => null}
                type={this.props.type} />
        )
    }
}