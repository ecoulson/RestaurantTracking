import React from "react";
import IToastProps from "./IToastProps";
import "./Toast.css";
import IToastState from "./IToastState";
import ToastType from "./ToastType";

export default class Toast extends React.Component<IToastProps, IToastState> {
    constructor(props : IToastProps) {
        super(props);
        this.state = {
            hasDisplayed: false
        }
    }

    render() {
        return (
            <div className={`${this.getVisibleClass()} ${this.getToastTheme()} toast-container`}>
                <p className="toast-message">{this.props.message}</p>
            </div> 
        )
    }

    componentDidUpdate() {
        if (this.state.hasDisplayed || this.props.message !== "") {
            if (!this.state.hasDisplayed) {
                this.setState({
                    hasDisplayed: true
                })
            }
        }
    }

    private getVisibleClass() {
        if (!this.state.hasDisplayed && this.props.message === "") {
            return "";
        } else {
            return this.props.message !== "" ?
                "show-toast" : "hide-toast"
        }
    }

    private getToastTheme() {
        switch(this.props.type) {
            case ToastType.Success:
                return "toast-success";
            case ToastType.Info:
                return "toast-info"
            case ToastType.Error:
            default:
                return "toast-error";
        }
    }
}