import React from "react";
import FormInput from "../FormInput";
import ITextInputProps from "./ITextInputProps";
import ITextInputState from "./ITextInputState";
import IFormValue from "../FormInput/IFormValue";
import FormValue from "../FormInput/FormValue";

export default class TextInput extends React.Component<ITextInputProps, ITextInputState> {
    constructor(props : ITextInputProps) {
        super(props);
        this.state = {
            text: new FormValue("", true)
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <FormInput 
                value={this.state.text.value}
                id={this.props.id}
                name={this.props.name}
                autocomplete={this.props.autocomplete}
                placeHolder={this.props.placeholder}
                help={this.props.help}
                label={this.props.label}
                icon={this.props.icon}
                iconColor={this.props.iconColor}
                hoverColor={this.props.hoverColor}
                isValid={this.props.isValid}
                dark={this.props.dark}
                onChange={this.onChange}
                type="text" />
        )
    }

    onChange(text: IFormValue<string>) {
        this.props.onChange(text.value)
        this.setState({ text })
    }
}