import React from "react";
import IToastProps from "./IToastProps";
import "./Toast.css";
import ToastType from "./ToastType";
import IState from "../../Store/IState";
import { connect, ConnectedProps } from "react-redux";
import { removeToast, deleteToast, renderToast } from "../../Store/Toast/actions";
import wait from "../../lib/Wait";
import { ToastMessage } from "../../Store/Toast/types";

class Toast extends React.Component<Props> {
    render() {
        return this.props.messages.map((toast, i) => {
            if (!toast.showing) {
                wait(250).then(() => {
                    this.props.deleteToast(toast.id)
                })
            }
            return (
                <div 
                    style={{top: `${i * 75 + 10}px`}}
                    onClick={() => this.props.removeToast(toast.id)}
                    key={i}
                    className={`${this.getVisibleClass(toast)} ${this.getToastTheme(toast.toastType)} toast-container`}>
                    <p className="toast-message">{toast.message}</p>
                </div> 
            )
        })
    }

    private getVisibleClass(toast: ToastMessage) {
        if (toast.rendered) {
            return "rendered-toast"
        }
        return toast.showing ?
            "show-toast" :
            "hide-toast"
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
    removeToast: removeToast,
    deleteToast: deleteToast,
    renderToast: renderToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IToastProps;

export default connector(Toast)