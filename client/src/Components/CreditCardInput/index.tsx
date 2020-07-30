import React from "react";
import CreditCardNumberInput from "./CreditCardNumberInput";
import CreditCardSecurityCodeInput from "./CreditCardSecurityCodeInput";
import "./index.css";
import CreditCardExpirationDateInput from "./CreditCardExpirationDateInput";

export default class CreditCardInput extends React.Component {
    render() {
        return (
            <div className="credit-card-input">
                <CreditCardNumberInput onChange={() => {}} />
                <CreditCardSecurityCodeInput onChange={() => {}} />
                <CreditCardExpirationDateInput onChange={() => {}} />
            </div>
        )
    }
}