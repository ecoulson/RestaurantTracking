import React, { ChangeEvent } from "react";
import Label from "./Label";
import IFormInputProps from "./IFormInputProps";
import "./FormInput.css";
import Icon from "../Icon";
import Input from "./Input";
import IFormInputState from "./IFormInputState";
import FormValue from "./FormValue";
import ValidationIcon from "./ValidationIcon";
import CustomDateInput from "./CustomDateInput";
import CustomTimeInput from "./CustomTimeInput";

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
            <div style={this.getBackgroundColor()} className={`form-input ${this.getActiveClass()}`}>
                <Label>{this.props.label}</Label>
                <div className="input-line">
                    <Icon icon={this.props.icon}/>
                    {this.getInput()}
                    <ValidationIcon 
                        isValid={this.props.isValid} 
                        value={this.props.value} />
                </div>
            </div>
        )
    }

    getInput() {
        if (this.props.type === "time") {
            return <CustomTimeInput
                disabled={this.props.disabled}
                value={this.props.value}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={this.props.placeHolder}
                type={this.props.type} 
                onChange={this.onChange} />
        } else if (this.props.type === "date") {
            return <CustomDateInput
                disabled={this.props.disabled}
                value={this.props.value}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={this.props.placeHolder}
                type={this.props.type} 
                onChange={this.onChange} />
        } else {
            return <Input
                disabled={this.props.disabled}
                value={this.props.value}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={this.props.placeHolder}
                type={this.props.type} 
                onChange={this.onChange} />
        }
    }

    getBackgroundColor() {
        return this.props.disabled ? {
            textDecoration: "line-through",
            backgroundColor: "rgb(14, 23, 34)"
        } : {
            backgroundColor: "#1B2D42"
        }
    }

    onChange(value : string, event? : ChangeEvent) {
        this.props.onChange(new FormValue<string>(
            value,
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