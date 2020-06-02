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
                        placeholder={this.props.placeHolder}
                        type={this.props.type} />
                </div>
            </div>
        )
    }
}