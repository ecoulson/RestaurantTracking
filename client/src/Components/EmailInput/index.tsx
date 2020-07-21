import React from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IEmailProps from "./IEmailProps";
import IEmailState from "./IEmailState";
import EmailValidator from "email-validator";
import IFormValue from "../FormInput/IFormValue";

export default class EmailInput extends React.Component<IEmailProps, IEmailState> {
    constructor(props : IEmailProps) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.state = {
            emailAddress: props.value ? props.value : "",
            valid: false, 
        };
    }

    static getDerivedStateFromProps(props : IEmailProps, state : IEmailState) : IEmailState {
        return {
            emailAddress: props.value ? props.value : state.emailAddress,
            valid: EmailValidator.validate(props.value ? props.value : state.emailAddress)
        }
    }

    render() {
        return (
            <FormInput
                onChange={this.handleEmailChange}
                iconColor={this.props.iconColor}
                isValid={this.state.valid}
                value={this.state.emailAddress}
                dark={this.props.dark}
                hoverColor={this.props.hoverColor}
                id={this.props.id}
                name="email"
                autocomplete="email"
                icon={IconType.Mail} 
                label="email" 
                placeHolder="Enter email here" 
                type="email" />
        )
    }

    private async handleEmailChange(email: IFormValue<string>) {
        await this.asyncSetState({
            emailAddress: email.value,
            valid: EmailValidator.validate(email.value)
        })
        this.props.onChange({
            value: this.state.emailAddress,
            valid: this.state.valid
        });
    }

    private asyncSetState(state : IEmailState) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        })
    }
}