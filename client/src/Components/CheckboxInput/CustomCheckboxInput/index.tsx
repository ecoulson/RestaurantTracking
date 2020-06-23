import React from "react";
import "./index.css";
import ICustomCheckboxInputProps from "./ICustomCheckboxInputProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CustomCheckboxInput extends React.Component<ICustomCheckboxInputProps> {
    constructor(props : ICustomCheckboxInputProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div 
                onClick={this.handleClick} 
                className={`custom-checkbox-input-shadow ${this.getShadowThemeClass()}`}>
                <div className={`${this.getCheckedClass()} ${this.getCheckboxThemeClass()} custom-checkbox-input`}>
                    {this.getContent()}
                </div>
            </div>
        )
    }

    private handleClick() {
        this.props.onClick(!this.props.checked)
    }

    private getCheckedClass() {
        if (this.props.dark) {
            return this.props.checked ?
                "custom-checked-dark" : ""
        } else {
            return this.props.checked ?
                "custom-checked-light" : ""
        }
    }

    private getContent() {
        return this.props.checked ?
            <FontAwesomeIcon 
                className="custom-checkbox-input-icon"
                icon="check" 
                color="white"/> :
            null;
    }

    private getShadowThemeClass() {
        return this.props.dark ? 
            "checkbox-input-shadow-dark" :
            "checkbox-input-shadow-light"
    }

    private getCheckboxThemeClass() {
        return this.props.dark ? 
            "checkbox-input-dark" :
            "checkbox-input-light"
    }
}