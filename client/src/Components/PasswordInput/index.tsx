import React from "react";
import IPasswordProps from "./IPasswordProps";
import IPasswordState from "./IPasswordState";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IFormValue from "../FormInput/IFormValue";
import Toast from "../Toast";
import ToastType from "../Toast/ToastType";

export default class PasswordInput extends React.Component<IPasswordProps, IPasswordState> {
    private digitRegex : RegExp;
    private uppercaseRegex : RegExp;
    private lowercaseRegex : RegExp;

    constructor(props : IPasswordProps) {
        super(props);
        this.state = {
            password: "",
            message: "",
            valid: this.props.registering ? true : undefined
        }
        this.digitRegex = new RegExp("\\d");
        this.uppercaseRegex = new RegExp("[A-Z]")
        this.lowercaseRegex = new RegExp("[a-z]")
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <>
                <Toast type={ToastType.Error} message={this.state.message} />
                <FormInput
                    value={this.state.password}
                    type="password"
                    label="Password"
                    iconColor={this.props.iconColor}
                    isValid={this.state.valid}
                    id={this.props.id}
                    icon={IconType.Lock}
                    placeHolder="Enter your password"
                    onChange={this.onChange}
                />
            </>
        )
    }

    private checkPassword() {
        if (this.state.password.length < 8) {
            this.setState({
                message: "Password is too short",
                valid: false
            })
        } else if (this.state.password.length > 64) {
            this.setState({
                message: "Password is too long",
                valid: false
            })
        } else if (!this.digitRegex.test(this.state.password)) {
            this.setState({
                message: "Password must contain a digit",
                valid: true
            })
        } else if (!this.uppercaseRegex.test(this.state.password)) {
            this.setState({
                message: "Password must contain a an uppercase letter",
                valid: true
            })
        } else if (!this.lowercaseRegex.test(this.state.password)) {
            this.setState({
                message: "Password must contain a an lowercase letter",
                valid: true
            })
        } else {
            this.setState({
                message: "",
                valid: true
            })
        }
        if (this.state.password === "") {
            this.setState({
                message: ""
            })
        }
    }

    private onChange(value : IFormValue<string>) {
        this.setState({
            password: value.value
        }, () => {
            if (this.props.registering) {
                this.checkPassword();
            }
        })
        this.props.onChange(value);
    }
}