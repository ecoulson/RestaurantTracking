import React from "react";
import Label from "./Label";
import IFormInputProps from "./IFormInputProps";
import "./FormInput.css";
import Icon from "../Icon";
import Input from "./Input";
import IFormInputState from "./IFormInputState";

export default class FormInput extends React.Component<IFormInputProps, IFormInputState> {
    constructor(props : IFormInputProps) {
        super(props);
        this.state = {
            focused: false
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
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
                        onChange={this.props.onChange} />
                    {this.renderValidIcon()}
                </div>
            </div>
        )
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

    private renderValidIcon() {
        if (this.props.value === "") {
            return null;
        }
        return this.props.isValid ?
            (<i className="fas fa-check valid-field"></i>) :
            (<i className="fas fa-times invalid-field"></i>);
    }
}