import React from "react";
import "./Submit.css";
import ISubmitProps from "./ISubmitProps";
import ISubmitState from "./ISubmitState";

export default class Submit extends React.Component<ISubmitProps, ISubmitState> {
    constructor(props : ISubmitProps) {
        super(props);
        this.state = {
            hasDisplayed: false
        }

        this.getClass = this.getClass.bind(this);
    }

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
        if (!this.state.hasDisplayed && !this.props.visible) {
            return "";
        } else {
            if (!this.state.hasDisplayed) {
                this.setState({
                    hasDisplayed: true
                })
            }
            return this.props.visible ? "show" : "hide";
        }
    }
}