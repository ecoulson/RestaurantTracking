import React from "react";
import "./Submit.css";
import ISubmitProps from "./ISubmitProps";

export default class Submit extends React.Component<ISubmitProps> {
    constructor(props : ISubmitProps) {
        super(props);
        this.getClass = this.getClass.bind(this);
    }

    render() {
        return (
            <button 
                onClick={this.props.onClick} 
                className={`submit ${this.getClass()}`} 
                type="button">
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