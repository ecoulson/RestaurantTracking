import React from "react";
import IToastProps from "./IToastProps";
import "./Toast.css";
import IToastState from "./IToastState";
import ToastType from "./ToastType";
import IState from "../../Store/IState";
import { connect, ConnectedProps } from "react-redux";
import { removeToast } from "../../Store/Toast/actions";

class Toast extends React.Component<Props, IToastState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            hasDisplayed: false
        }
    }

    render() {
        return this.props.messages.map((toast, i) => {
            return (
                <div 
                    style={{top: `${i * 75 + 10}px`}}
                    onClick={() => this.props.removeToast(toast.id)}
                    key={i}
                    className={`${this.getVisibleClass(toast.message)} ${this.getToastTheme(toast.toastType)} toast-container`}>
                    <p className="toast-message">{toast.message}</p>
                </div> 
            )
        })
    }

    componentDidUpdate() {
        // if (this.state.hasDisplayed || this.props.message !== "") {
        //     if (!this.state.hasDisplayed) {
        //         this.setState({
        //             hasDisplayed: true
        //         })
        //     }
        // }
    }

    private getVisibleClass(message: string) {
        // if (!this.state.hasDisplayed && message === "") {
        //     return "";
        // } else {
        //     return message !== "" ?
        //         "show-toast" : "hide-toast"
        // }
        return "show-toast"
    }

    private getToastTheme(type : ToastType) {
        switch(type) {
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

const mapState = (state : IState) => {
    return {
        messages: state.toast.messages
    }
}

const mapDispatch = {
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IToastProps;

export default connector(Toast)