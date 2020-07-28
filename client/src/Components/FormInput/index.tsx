import React, { ChangeEvent } from "react";
import Label from "./Label";
import IFormInputProps from "./IFormInputProps";
import "./FormInput.css";
import Icon from "../Icon";
import Input from "./Input";
import IFormInputState from "./IFormInputState";
import FormValue from "./FormValue";
import ValidationIcon from "./ValidationIcon";
const CustomDateInput = React.lazy(() => import("./CustomDateInput"));
const CustomTimeInput = React.lazy(() => import("./CustomTimeInput"));

export default class FormInput extends React.Component<IFormInputProps, IFormInputState> {
    constructor(props : IFormInputProps) {
        super(props);
        this.state = {
            focused: false,
            hovered: false
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    render() {
        return (
            <div 
                id={`form-input-${this.props.id}`}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                style={this.getBackgroundColor()} 
                className={`form-input ${this.getActiveClass()}`}>
                <Label id={`form-input-${this.props.id}`} dark={this.props.dark}>{this.props.label}</Label>
                <div className="input-line">
                    <Icon 
                        hovered={this.state.focused || this.state.hovered} 
                        hoverColor={this.props.hoverColor}
                        color={this.props.iconColor} 
                        icon={this.props.icon}/>
                    {this.getInput()}
                    {this.getValidationIcon()}
                </div>
            </div>
        )
    }

    toggleHover() {
        this.setState({
            hovered: !this.state.hovered
        })
    }

    getInput() {
        if (this.props.type === "time") {
            return <CustomTimeInput
                disabled={this.props.disabled}
                value={this.props.value}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                name={this.props.name}
                autocomplete={this.props.autocomplete}
                placeholder={this.props.placeHolder}
                dark={this.props.dark}
                type={this.props.type} 
                onChange={this.onChange} />
        } else if (this.props.type === "date") {
            return <CustomDateInput
                disabled={this.props.disabled}
                value={this.props.value}
                name={this.props.name}
                onFocus={this.onFocus}
                autocomplete={this.props.autocomplete}
                onBlur={this.onBlur}
                dark={this.props.dark}
                placeholder={this.props.placeHolder}
                type={this.props.type} 
                onChange={this.onChange} />
        } else {
            return <Input
                dark={this.props.dark}
                name={this.props.name}
                disabled={this.props.disabled}
                autocomplete={this.props.autocomplete}
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
                backgroundColor: "transparent"
            }
        } else {
            return this.props.disabled ? {
                textDecoration: "line-through",
                backgroundColor: "#E8E8E8"
            } : {
                backgroundColor: "transparent"
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
            return (this.state.focused || this.state.hovered) ? "active-dark" : ""
        } else {
            return (this.state.focused || this.state.hovered) ? "active-light" : ""
        }
    }
}