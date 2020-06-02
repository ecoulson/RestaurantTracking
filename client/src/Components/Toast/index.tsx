import React from "react";
import IToastProps from "./IToastProps";
import "./Toast.css";
import IToastState from "./IToastState";

export default class Toast extends React.Component<IToastProps, IToastState> {
    constructor(props : IToastProps) {
        super(props);
        this.state = {
            hasDisplayed: false
        }
    }

    render() {
        return (
            <div className={`${this.getVisibleClass()} toast-container`}>
                <p className="toast-message">{this.props.message}</p>
            </div> 
        )
    }

    private getVisibleClass() {
        if (!this.state.hasDisplayed && this.props.message === "") {
            return "";
        } else {
            if (!this.state.hasDisplayed) {
                this.setState({
                    hasDisplayed: true
                })
            }
            return this.props.message !== "" ?
                "show-toast" : "hide-toast"
        }
    }
}