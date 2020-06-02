import React, { ChangeEvent } from "react";
import Label from "./Label";
import IFormInputProps from "./IFormInputProps";
import "./FormInput.css";
import Icon from "../Icon";
import Input from "./Input";
import IFormInputState from "./IFormInputState";
import FormValue from "./FormValue";
import ValidationIcon from "./ValidationIcon";

export default class FormInput extends React.Component<IFormInputProps, IFormInputState> {
    constructor(props : IFormInputProps) {
        super(props);
        this.state = {
            focused: false
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div className={`form-input ${this.getActiveClass()}`}>
                <Label>{this.props.label}</Label>
                <div className="input-line">
                    <Icon icon={this.props.icon}/>
                    <Input
                        value={this.props.value}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        placeholder={this.props.placeHolder}
                        type={this.props.type} 
                        onChange={this.onChange} />
                    <ValidationIcon 
                        isValid={this.props.isValid} 
                        value={this.props.value} />
                </div>
            </div>
        )
    }

    onChange(event : ChangeEvent) {
        this.props.onChange(new FormValue<string>(
            (event.target as HTMLInputElement).value,
            this.props.isValid
        ),  event)
    }

    onFocus() {
        this.setState({
            focused: true
        })
    }

    onBlur() {
        this.setState({
            focused: false
        })
    }

    private getActiveClass() {
        return this.state.focused ? "active" : ""
    }
}