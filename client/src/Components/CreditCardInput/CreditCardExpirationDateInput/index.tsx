import React from "react";
import TextInput from "../../TextInput";
import IconType from "../../Icon/IconTypes";
import "./index.css";
import ICreditCardExpirationDateInputProps from "./ICreditCardExpirationDateInputProps";
import ICreditCardExpirationDateInputState from "./ICreditCardExpirationDateInputState";
import FormValue from "../../FormInput/FormValue";

const valid = require("card-validator");

export default class CreditCardExpirationDateInput extends React.Component<ICreditCardExpirationDateInputProps, ICreditCardExpirationDateInputState> {
    constructor(props: ICreditCardExpirationDateInputProps) {
        super(props);
        this.state = {
            date: [
                new FormValue<string>("", false), 
                new FormValue<string>("", false)
            ]
        }
        this.onMonthChange = this.onMonthChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
    }

    render() {
        return (
            <div className="credit-card-expiration-date-input">
                <TextInput 
                    label="Month"
                    icon={IconType.Calendar}
                    iconColor="grey"
                    hoverColor="black"
                    name="ccmonth"
                    autocomplete="cc-exp-month"
                    id="credit-card-month"
                    isValid={this.state.date[0].valid}
                    placeholder="MM"
                    onChange={this.onMonthChange} /> 
                <TextInput 
                    label="Year"
                    icon={IconType.Calendar}
                    iconColor="grey"
                    hoverColor="black"
                    name="ccyear"
                    autocomplete="cc-exp-year"
                    id="credit-card-year"
                    isValid={this.state.date[1].valid}
                    placeholder="YYYY"
                    onChange={this.onYearChange} />
            </div>
        )
    }

    onMonthChange(month: string) {
        this.setState({
            date: [
                new FormValue<string>(month, valid.expirationMonth(month).isValidForThisYear), 
                this.state.date[1]
            ]
        }, () => {
            this.props.onChange(this.state.date)
        })
    }

    onYearChange(year: string) {
        this.setState({
            date: [
                this.state.date[0],
                new FormValue<string>(year, valid.expirationYear(year).isValid)
            ]
        }, () => {
            this.props.onChange(this.state.date)
        })
    }
}