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
            emailAddress: "",
            valid: false
        };
    }

    render() {
        return (
            <FormInput
                onChange={this.handleEmailChange}
                iconColor={this.props.iconColor}
                isValid={this.state.valid}
                value={this.state.emailAddress}
                dark={this.props.dark}
                icon={IconType.Mail} 
                label="email" 
                placeHolder="Enter email here" 
                type="email" />
        )
    }

    private handleEmailChange(event: IFormValue<string>) {
        this.setState({
            emailAddress: event.value,
            valid: EmailValidator.validate(event.value)
        }, () => {
            this.props.onChange({
                value: this.state.emailAddress,
                valid: this.state.valid
            });
        })
    }
}