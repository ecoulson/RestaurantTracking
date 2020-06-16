import React from "react";
import IUsernameInputProps from "./IUsernameInputProps";
import IUsernameInputState from "./IUsernameInputState";
import IFormValue from "../FormInput/IFormValue";
import IconType from "../Icon/IconTypes";
import FormInput from "../FormInput";
import { debounce } from "../../lib/Debounce";
import Axios from "axios";
import ToastType from "../Toast/ToastType";
import Toast from "../Toast";

export default class UsernameInput extends React.Component<IUsernameInputProps, IUsernameInputState> {
    private validateUsername : () => void;

    constructor(props: IUsernameInputProps) {
        super(props);
        this.state = {
            username: "",
            message: "",
            valid: this.props.registering ? true : undefined,
        }
        this.validateUsername = debounce(() => {
            this.checkUsername();
        }, 500)
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <>
                <Toast type={ToastType.Error} message={this.state.message}/>
                <FormInput
                    value={this.state.username}
                    id={this.props.id}
                    iconColor={this.props.iconColor}
                    isValid={this.state.valid}
                    type="text"
                    label="Username"
                    icon={IconType.User}
                    placeHolder="Enter your username"
                    onChange={this.onChange}
                />
            </>
        )
    }

    private async checkUsername() {
        try {
            if (this.state.username === "") {
                return this.setState({
                    valid: true,
                    message: ""
                })
            }
            const res = await Axios.get(`user/registration/availible/${this.state.username}`);
            this.setState({
                valid: res.data.data.availible,
                message: res.data.data.availible ? "" : "Username has been taken"
            })
        } catch (error) {
            this.setState({
                message: "Failed to check if username is availible"
            })
        }
    }

    private onChange(formValue : IFormValue<string>) {
        this.props.onChange(formValue);
        this.setState({
            username: formValue.value
        }, () => {
            if (this.props.registering) {
                this.validateUsername();
            }
        })
    }
}