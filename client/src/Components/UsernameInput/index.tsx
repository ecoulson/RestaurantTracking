import React from "react";
import IUsernameInputProps from "./IUsernameInputProps";
import IUsernameInputState from "./IUsernameInputState";
import IFormValue from "../FormInput/IFormValue";
import IconType from "../Icon/IconTypes";
import FormInput from "../FormInput";

export default class UsernameInput extends React.Component<IUsernameInputProps, IUsernameInputState> {
    constructor(props: IUsernameInputProps) {
        super(props);
        this.state = {
            username: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <FormInput
                value={this.state.username}
                type="text"
                label="Username"
                icon={IconType.User}
                placeHolder="Enter your password"
                onChange={this.onChange}
            />
        )
    }

    private onChange(formValue : IFormValue<string>) {
        this.props.onChange(formValue.value);
        this.setState({
            username: formValue.value
        })
    }
}