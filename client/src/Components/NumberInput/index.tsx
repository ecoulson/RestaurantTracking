import React from "react";
import INumberInputProps from "./INumberInputProps";
import INumberInputState from "./INumberInputState";
import FormInput from "../FormInput";
import IFormValue from "../FormInput/IFormValue";

export default class NumberInput extends React.Component<INumberInputProps, INumberInputState> {
    constructor(props : INumberInputProps) {
        super(props);
        this.state = {
            number: props.value ? props.value.toString() : ""
        }
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    render() {
        return (
            <FormInput 
                iconColor="#AAAAAA"
                name="number"
                id={this.props.id}
                icon={this.props.icon} 
                placeHolder={this.props.placeHolder}
                value={this.props.value !== undefined ? this.props.value : this.state.number} 
                label={this.props.label} 
                hoverColor={this.props.hoverColor}
                type="text" 
                onChange={this.handleNumberChange} />
        )
    }

    private handleNumberChange(number: IFormValue<string>) {
        this.props.onChange(parseInt(number.value))
        this.setState({
            number: number.value
        }, () => {
            
        })
    }
}