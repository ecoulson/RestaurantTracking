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
            <div onClick={this.handleClick} className="custom-checkbox-input-shadow">
                <div className={`${this.getCheckedClass()} custom-checkbox-input`}>
                    {this.getContent()}
                </div>
            </div>
        )
    }

    private handleClick() {
        console.log(this.props.checked);
        this.props.onClick(!this.props.checked)
    }

    private getCheckedClass() {
        return this.props.checked ?
                "custom-checked" : ""
    }

    private getContent() {
        return this.props.checked ?
            <FontAwesomeIcon 
                className="custom-checkbox-input-icon"
                icon="check" 
                color="white"/> :
            null;
    }
}