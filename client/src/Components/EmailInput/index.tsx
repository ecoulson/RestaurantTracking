import React, { ChangeEvent } from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IEmailProps from "./IEmailProps";
import IEmailState from "./IEmailState";
import EmailValidator from "email-validator";

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
                isValid={this.state.valid}
                value={this.state.emailAddress}
                icon={IconType.Mail} 
                label="email" 
                placeHolder="Enter email here" 
                type="email" />
        )
    }

    private handleEmailChange(event: ChangeEvent) {
        let rawEmail = (event.target as HTMLInputElement).value;
        this.setState({
            emailAddress: rawEmail,
            valid: EmailValidator.validate(rawEmail)
        }, () => {
            this.props.onChange({
                email: this.state.emailAddress,
                valid: this.state.valid
            });
        })
    }
}