import React from "react";
import CreditCardNumberInput from "./CreditCardNumberInput";

export default class CreditCardInput extends React.Component {
    render() {
        return (
            <div className="credit-card-input">
                <CreditCardNumberInput onChange={() => {}} />
            </div>
        )
    }
}