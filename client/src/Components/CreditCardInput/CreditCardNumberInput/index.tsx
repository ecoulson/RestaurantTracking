import React from "react";
import TextInput from "../../TextInput";
import IconType from "../../Icon/IconTypes";
import ICreditCardNumberInputProps from "./ICreditCardNumberInputProps";
import ICreditCardNumberInputState from "./ICreditCardNumberInputState";
import FormValue from "../../FormInput/FormValue";

const valid = require("card-validator");

export default class CreditCardNumberInput extends React.Component<ICreditCardNumberInputProps, ICreditCardNumberInputState> {
    constructor(props: ICreditCardNumberInputProps) {
        super(props);
        this.state = {
            number: new FormValue("", false),
            cardType: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <TextInput 
                label="Card Number"
                icon={this.getIcon()}
                iconColor="grey"
                hoverColor="black"
                name="cardnumber"
                autocomplete="cc-number"
                id="credit-card"
                isValid={this.state.number.valid}
                placeholder="Card Number"
                onChange={this.onChange} />
        )
    }

    onChange(value: string) {
        const validatedNumber = valid.number(value);
        this.setState({ 
            number: new FormValue(value, validatedNumber.isValid),
            cardType: validatedNumber.card ? validatedNumber.card.type : ""
        }, () => {
            this.props.onChange(this.state.number)
        })
    }

    getIcon() {
        switch (this.state.cardType) {
            case "visa":
                return IconType.VisaCard;
            case "american-express":
                return IconType.AmexCard;
            case "diners-club":
                return IconType.DinersClubCard;
            case "discover":
                return IconType.DiscoverCard;
            case "jcb":
                return IconType.JCBCard;
            case "mastercard":
                return IconType.MastercardCard;
            default: 
                return IconType.CreditCard;
        }
    }
}