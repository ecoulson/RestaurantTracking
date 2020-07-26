import React from "react";
import IPasswordProps from "./IPasswordProps";
import IPasswordState from "./IPasswordState";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IFormValue from "../FormInput/IFormValue";
import ToastType from "../Toast/ToastType";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect, ConnectedProps } from "react-redux";

class PasswordInput extends React.Component<Props, IPasswordState> {
    private digitRegex : RegExp;
    private uppercaseRegex : RegExp;
    private lowercaseRegex : RegExp;

    constructor(props : Props) {
        super(props);
        this.state = {
            password: "",
            message: null,
            valid: this.props.registering ? true : undefined
        }
        this.digitRegex = new RegExp("\\d");
        this.uppercaseRegex = new RegExp("[A-Z]")
        this.lowercaseRegex = new RegExp("[a-z]")
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <FormInput
                    value={this.state.password}
                    type="password"
                    label={this.props.label ? this.props.label : "Password"} 
                    name="password"
                    autocomplete={this.props.registering ? "new-password" : "current-password"}
                    iconColor={this.props.iconColor}
                    isValid={this.state.valid}
                    id={this.props.id}
                    dark={this.props.dark}
                    hoverColor={this.props.hoverColor}
                    icon={IconType.Lock}
                    placeHolder={this.props.placeholder ? this.props.placeholder : "Enter your password"}
                    onChange={this.onChange}
                />
        )
    }

    private checkPassword() {
        console.log(this.state.message, this.props.messages);
        if (this.state.message) {
            this.props.removeToast(this.state.message.id)
        }
        if (this.state.password.length < 8) {
            this.setState({
                message: this.props.addToast("Password is too short", ToastType.Error)
            })
        } else if (this.state.password.length > 64) {
            this.setState({
                message: this.props.addToast("Password is too long", ToastType.Error)
            })
        } else if (!this.state.password.match(this.digitRegex)) {
            this.setState({
                message: this.props.addToast("Password must contain a digit", ToastType.Error)
            })
        } else if (!this.state.password.match(this.uppercaseRegex)) {
            this.setState({
                message: this.props.addToast("Password must contain a an uppercase letter", ToastType.Error)
            })
        } else if (!this.state.password.match(this.lowercaseRegex)) {
            this.setState({
                message: this.props.addToast("Password must contain a an lowercase letter", ToastType.Error)
            })
        } else {
            this.setState({
                message: null
            })
        }
    }

    private async onChange(password : IFormValue<string>) {
        await this.asyncSetState({
            password: password.value
        })
        if (this.props.registering) {
            this.checkPassword();
        }
        this.props.onChange(password);
    }

    private asyncSetState(state : any) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        })
    }
}

const mapState = (state : IState) => {
    return {
        messages: state.toast.messages
    }
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IPasswordProps;

export default connector(PasswordInput)