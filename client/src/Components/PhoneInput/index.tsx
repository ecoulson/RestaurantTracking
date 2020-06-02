import React, { ChangeEvent } from "react";
import IconType from "../Icon/IconTypes";
import FormInput from "../FormInput";
import IPhoneInputProps from "./IPhoneInputProps";
import { AsYouType, parseNumber } from "libphonenumber-js"
import IPhoneInputState from "./IPhoneInputState";

export default class PhoneInput extends React.Component<IPhoneInputProps, IPhoneInputState> {

    constructor(props : IPhoneInputProps) {
        super(props);
        this.state = {
            number: "",
            isValid: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <FormInput 
                value={this.state.number}
                isValid={this.state.isValid}
                icon={IconType.Phone} 
                label="phone"
                placeHolder="Enter phone number here"
                onChange={this.handleChange}
                type="tel" />
        )
    }

    private handleChange(event : ChangeEvent) {
        let rawPhoneNumber = (event.target as HTMLInputElement).value;
        if (this.isDeletingAreaCode(event)) {
            rawPhoneNumber = this.deleteAreaCode(rawPhoneNumber);
        };
        const formattedNumber = new AsYouType("US").input(rawPhoneNumber);
        this.updateState(formattedNumber, () => {
            this.props.onChange({
                number: this.state.number,
                valid: this.state.isValid
            });
        });
    }

    private isDeletingAreaCode(event : ChangeEvent) {
        return (event.nativeEvent as InputEvent).inputType === "deleteContentBackward" && this.state.number.endsWith(")");
    }

    private deleteAreaCode(rawPhoneNumber : string) {
        return rawPhoneNumber.substring(0, rawPhoneNumber.length - 1);
    }

    private updateState(formattedNumber : string, done : () => void) {
        this.setState({
            number: formattedNumber,
            isValid: Object.keys(parseNumber(formattedNumber, "US")).length === 2
        }, done);
    }
}