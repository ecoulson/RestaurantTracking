import React from "react";
import "./index.css";
import IButtonProps from "./IButtonProps";

export default class Button extends React.Component<IButtonProps> {
    constructor(props : IButtonProps) {
        super(props);
        this.getClass = this.getClass.bind(this);
    }

    render() {
        return (
            <button 
                onClick={this.props.onClick ? this.props.onClick : () => {}} 
                className={`button ${this.getClass()}`} 
                type={this.props.submit ? "submit" : "button"}>
                    {this.props.children}
            </button>
        )
    }

    private getClass() {
        if (this.props.visible === undefined) {
            return this.props.dark ? "show show-dark" : "show show-light";
        }
        if (this.props.dark) {
            return this.props.visible ? "show show-dark" : "hide";
        } else {
            return this.props.visible ? "show show-light" : "hide";
        }
    }
}