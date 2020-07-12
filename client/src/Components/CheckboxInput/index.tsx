import React, { ChangeEvent } from "react";
import ICheckboxProps from "./ICheckboxProps";
import ICheckboxState from "./ICheckboxState";
import "./index.css";
import CustomCheckboxInput from "./CustomCheckboxInput";
import CheckboxContainer from "./CheckboxContainer";

export default class CheckboxInput extends React.Component<ICheckboxProps, ICheckboxState> {
    constructor(props : ICheckboxProps) {
        super(props);
        this.state = {
            checked: props.checked ? props.checked : false
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <CheckboxContainer>
                <input
                    className="checkbox-input-native"
                    checked={this.state.checked}
                    onChange={this.onChange}
                    tabIndex={0}
                    type="checkbox" />
                <CustomCheckboxInput 
                    dark={this.props.dark}
                    onClick={this.onClick} 
                    checked={this.state.checked}/>
                <label className={`checkbox-label-input ${this.getThemeClass()}`}>
                    {this.props.label}
                </label>
            </CheckboxContainer>
        )
    }

    private onChange(event : ChangeEvent) {
        const value = (event.target as HTMLInputElement).checked;
        this.onClick(value);
    }

    private onClick(checked : boolean) {
        this.props.onChange(checked);
        this.setState({
            checked: checked
        })
    }

    private getThemeClass() {
        return this.props.dark ? 
            "checkbox-input-label-dark" :
            "checkbox-input-label-light"
    }
}