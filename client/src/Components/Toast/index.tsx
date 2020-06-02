import React from "react";
import IToastProps from "./IToastProps";
import "./Toast.css";

export default class Toast extends React.Component<IToastProps> {
    constructor(props : IToastProps) {
        super(props);
        this.state = {
            hasBeenCalled: false
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
        return this.props.message !== "" ?
                "show-toast" : "hide-toast"
    }
}