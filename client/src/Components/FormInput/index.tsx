import React from "react";
import Label from "./Label";
import IFormInputProps from "./IFormInputProps";
import "./FormInput.css";
import Icon from "../Icon";
import Input from "./Input";

export default class FormInput extends React.Component<IFormInputProps> {
    render() {
        return (
            <div className="form-input">
                <Label>{this.props.label}</Label>
                <div className="input-line">
                    <Icon icon={this.props.icon}/>
                    <Input
                        value={this.props.value}
                        placeholder={this.props.placeHolder}
                        type={this.props.type} 
                        onChange={this.props.onChange} />
                    {this.renderValidIcon()}
                </div>
            </div>
        )
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