import React, { ChangeEvent } from "react";
import "./Input.css";
import IInputProps from "./IInputProps";

export default class Input extends React.Component<IInputProps> {
    constructor(props : IInputProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <input
                value={this.props.value}
                autoComplete={this.props.autocomplete ? this.props.autocomplete : "off"}
                name={this.props.name}
                disabled={this.props.disabled}
                className={`form-raw-input ${this.getThemeClass()}`}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                onBlur={this.props.onBlur ? this.props.onBlur : () => null}
                onFocus={this.props.onFocus ? this.props.onFocus : () => null}
                type={this.props.type} />
        )
    }

    private handleChange(event: ChangeEvent) {
        this.props.onChange((event.target as HTMLInputElement).value, event)
    }

    private getThemeClass() {
        return this.props.dark ? 
            "form-raw-input-dark" :
            "form-raw-input-light"
    }
}