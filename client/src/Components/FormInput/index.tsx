import React, { ChangeEvent } from "react";
import Label from "./Label";
import IFormInputProps from "./IFormInputProps";
import "./FormInput.css";
import Icon from "../Icon";
import Input from "./Input";
import IFormInputState from "./IFormInputState";
import FormValue from "./FormValue";
import ValidationIcon from "./ValidationIcon";
import IconType from "../Icon/IconTypes";
const CustomDateInput = React.lazy(() => import("./CustomDateInput"));
const CustomTimeInput = React.lazy(() => import("./CustomTimeInput"));

export default class FormInput extends React.Component<IFormInputProps, IFormInputState> {
    constructor(props : IFormInputProps) {
        super(props);
        this.state = {
            focused: false,
            hovered: false,
            helpHovered: false
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.handleHelpHoverEnd = this.handleHelpHoverEnd.bind(this);
        this.handleHelpHoverStart = this.handleHelpHoverStart.bind(this);
    }

    render() {
        return (
            <div 
                id={`form-input-${this.props.id}-container`}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                style={this.getBackgroundColor()} 
                className={`form-input ${this.getActiveClass()}`}>
                <Label id={`form-input-${this.props.id}`} dark={this.props.dark}>
                    <div 
                        onMouseEnter={this.handleHelpHoverStart}
                        onMouseLeave={this.handleHelpHoverEnd}
                        onTouchStart={this.handleHelpHoverStart}
                        onTouchEnd={this.handleHelpHoverEnd}
                        className="label-container">
                        <span>{this.props.label}</span>
                        {this.renderHelpIcon()}
                        {this.renderHelpTooltip()}
                    </div>
                    <div className="input-line">
                    <Icon 
                        hovered={this.state.focused || this.state.hovered} 
                        hoverColor={this.props.hoverColor}
                        color={this.props.iconColor} 
                        icon={this.props.icon}/>
                    {this.getInput()}
                    {this.getValidationIcon()}
                </div>
                </Label>
            </div>
        )
    }

    handleHelpHoverStart() {
        this.setState({
            helpHovered: true
        })
    }

    handleHelpHoverEnd() {
        this.setState({
            helpHovered: false
        })
    }

    renderHelpIcon() {
        return this.props.help ?
            <Icon 
                width={15} 
                height={15} 
                color="grey"
                icon={IconType.Help} /> :
            null;
    }

    renderHelpTooltip() {
        return this.state.helpHovered && this.props.help ?
            <div className="form-tool-tip">{this.props.help}</div> :
            null;
    }

    toggleHover() {
        this.setState({
            hovered: !this.state.hovered
        })
    }

    getInput() {
        if (this.props.type === "time") {
            return <CustomTimeInput
                id={`form-input-${this.props.id}`}
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
                id={`form-input-${this.props.id}`}
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
                id={`form-input-${this.props.id}`}
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