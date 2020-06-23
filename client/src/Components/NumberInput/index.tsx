import React from "react";
import INumberInputProps from "./INumberInputProps";
import INumberInputState from "./INumberInputState";
import FormInput from "../FormInput";
import IFormValue from "../FormInput/IFormValue";

export default class NumberInput extends React.Component<INumberInputProps, INumberInputState> {
    constructor(props : INumberInputProps) {
        super(props);
        this.state = {
            number: "0"
        }
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    render() {
        return (
            <FormInput 
                iconColor="#AAAAAA" 
                icon={this.props.icon} 
                placeHolder={this.props.placeHolder}
                value={this.state.number} 
                label={this.props.label} 
                type="text" 
                onChange={this.handleNumberChange} />
        )
    }

    private handleNumberChange(number: IFormValue<string>) {
        this.props.onChange(parseInt(number.value))
        this.setState({
            number: number.value
        })
    }
}