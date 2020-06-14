import React from "react";
import IPasswordProps from "./IPasswordProps";
import IPasswordState from "./IPasswordState";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IFormValue from "../FormInput/IFormValue";

export default class PasswordInput extends React.Component<IPasswordProps, IPasswordState> {
    constructor(props : IPasswordProps) {
        super(props);
        this.state = {
            password: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return <FormInput
                value={this.state.password}
                type="password"
                label="Password"
                iconColor={this.props.iconColor}
                icon={IconType.Lock}
                placeHolder="Enter your password"
                onChange={this.onChange}
            />
    }

    private onChange(value : IFormValue<string>) {
        this.setState({
            password: value.value
        })
        this.props.onChange(value.value);
    }
}