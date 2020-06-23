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
            <div id={`form-input-${this.props.id}`} style={this.getBackgroundColor()} className={`form-input ${this.getActiveClass()}`}>
                <Label dark={this.props.dark}>{this.props.label}</Label>
                <div className="input-line">
                    <Icon color={this.props.iconColor} icon={this.props.icon}/>
                    {this.getInput()}
                    {this.getValidationIcon()}
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
                dark={this.props.dark}
                type={this.props.type} 
                onChange={this.onChange} />
        } else if (this.props.type === "date") {
            return <CustomDateInput
                disabled={this.props.disabled}
                value={this.props.value}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                dark={this.props.dark}
                placeholder={this.props.placeHolder}
                type={this.props.type} 
                onChange={this.onChange} />
        } else {
            return <Input
                dark={this.props.dark}
                disabled={this.props.disabled}
                value={this.props.value}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={this.props.placeHolder}
                type={this.props.type} 
                onChange={this.onChange} />
        }
    }

    private getValidationIcon() {
        if (this.props.isValid === undefined) {
            return null;
        } else {
            return <ValidationIcon 
                isValid={this.props.isValid} 
                value={this.props.value} />
        }
    }

    //TODO: Convert to css classes
    getBackgroundColor() {
        if (this.props.dark) {
            return this.props.disabled ? {
                textDecoration: "line-through",
                backgroundColor: "rgb(14, 23, 34)"
            } : {
                backgroundColor: "#1B2D42"
            }
        } else {
            return this.props.disabled ? {
                textDecoration: "line-through",
                backgroundColor: "#E8E8E8)"
            } : {
                backgroundColor: "#E8E8E8"
            }
        }
    }

    onChange(value : string, event? : ChangeEvent) {
        this.props.onChange(new FormValue<string>(
            value,
            this.props.isValid ? this.props.isValid : false
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
        if (this.props.dark) {
            return this.state.focused ? "active-dark" : ""
        } else {
            return this.state.focused ? "active-light" : ""
        }
    }
}