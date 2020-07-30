import React from "react";
import CreditCardNumberInput from "./CreditCardNumberInput";
import CreditCardSecurityCodeInput from "./CreditCardSecurityCodeInput";
import "./index.css";
import CreditCardExpirationDateInput from "./CreditCardExpirationDateInput";
import CreditCardZipInput from "./CreditCardZipInput";
import ICreditCardInputState from "./ICreditCardInputState";
import IFormValue from "../FormInput/IFormValue";
import FormValue from "../FormInput/FormValue";
import ICreditCardInputProps from "./ICreditCardInputProps";

export default class CreditCardInput extends React.Component<ICreditCardInputProps, ICreditCardInputState> {
    constructor(props: ICreditCardInputProps) {
        super(props);
        this.state = {
            number: new FormValue<string>("", false),
            cvc: new FormValue<string>("", false),
            expirationDate: [new FormValue("", false), new FormValue("", false)],
            zip: new FormValue<string>("", false)
        }

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCVCChange = this.onCVCChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <>
                <div className="credit-card-input">
                    <div className="credit-card-number-container">
                        <CreditCardNumberInput onChange={this.onNumberChange} />
                    </div>
                    <div className="credit-card-cvc-container">
                        <CreditCardSecurityCodeInput onChange={this.onCVCChange} />
                    </div>
                </div>
                <div className="credit-card-input">
                    <div className="credit-card-date-container">
                        <CreditCardExpirationDateInput onChange={this.onDateChange} />
                    </div>
                    <div className="credit-card-zip-container">
                        <CreditCardZipInput onChange={this.onZipChange} />
                    </div>
                </div>
            </>
        )
    }

    onNumberChange(number: IFormValue<string>) {
        this.setState({ number}, this.handleChange)
    }

    onCVCChange(cvc : IFormValue<string>) {
        this.setState({ cvc }, this.handleChange)
    }

    onDateChange(expirationDate : [IFormValue<string>, IFormValue<string>]) {
        this.setState({ expirationDate }, this.handleChange)
    }

    onZipChange(zip : IFormValue<string>) {
        this.setState({ zip }, this.handleChange)
    }

    handleChange() {
        this.props.onChange(this.state)
    }
}