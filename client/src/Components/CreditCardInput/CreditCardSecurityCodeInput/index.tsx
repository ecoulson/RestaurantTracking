import React from "react";
import TextInput from "../../TextInput";
import IconType from "../../Icon/IconTypes";
import ICreditCardSecurityCodeState from "./ICreditCardSecurityCodeState";
import ICreditCardSecurityCodeInputProps from "./ICreditCardSecurityCodeInputProps";
import FormValue from "../../FormInput/FormValue";

const valid = require("card-validator");

export default class CreditCardSecurityCodeInput extends React.Component<ICreditCardSecurityCodeInputProps, ICreditCardSecurityCodeState> {
    constructor(props : ICreditCardSecurityCodeInputProps) {
        super(props);
        this.state = {
            code: new FormValue("", false)
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <TextInput 
                label="Security Code"
                icon={IconType.Lock}
                iconColor="grey"
                hoverColor="black"
                name="cvc"
                autocomplete="cc-csc"
                id="credit-card-cvc"
                isValid={this.state.code.valid}
                placeholder="CVC"
                onChange={this.onChange} />
        )
    }

    onChange(cvc : string) {
        this.setState({
            code: new FormValue(cvc, valid.cvv(cvc, this.props.cvvLength).isValid)
        }, () => {
            this.props.onChange(this.state.code);
        })
    }
}