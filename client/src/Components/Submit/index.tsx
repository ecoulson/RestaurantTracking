import React from "react";
import "./Submit.css";
import ISubmitProps from "./ISubmitProps";

export default class Submit extends React.Component<ISubmitProps> {
    render() {
        return (
            <button 
                onClick={this.props.onClick} 
                className={`submit ${this.getClass()}`} 
                type="button">
                    Submit
            </button>
        )
    }

    private getClass() {
        return this.props.visible ? "show" : "hide";
    }
}