import React from "react";
import TextInput from "../../TextInput";
import IconType from "../../Icon/IconTypes";
import ICreditCardZipInputProps from "./ICreditCardZipInputProps";
import ICreditCardZipInputState from "./ICreditCardZipInputState";
import FormValue from "../../FormInput/FormValue";

export default class CreditCardZipInput extends React.Component<ICreditCardZipInputProps, ICreditCardZipInputState> {
    constructor(props : ICreditCardZipInputProps) {
        super(props);
        this.state = {
            zip: new FormValue<string>("", false)
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <TextInput 
                label="Zip"
                icon={IconType.AddressCardSolid}
                iconColor="grey"
                hoverColor="black"
                name="cardzip"
                autocomplete="cc-zip"
                id="credit-card-zip"
                isValid={this.state.zip.valid}
                placeholder="Zip"
                onChange={this.onChange}/>
        )
    }

    onChange(zip: string) {
        this.setState({
            zip: new FormValue(zip, zip.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)?.length === 1)
        })
    }
}