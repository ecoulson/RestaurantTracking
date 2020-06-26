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
import FormValue from "../FormInput/FormValue";

export default class UsernameInput extends React.Component<IUsernameInputProps, IUsernameInputState> {
    private validateUsername : () => void;

    constructor(props: IUsernameInputProps) {
        super(props);
        this.state = {
            username: props.value ? props.value : "",
            message: "",
            valid: props.registering ? true : undefined,
        }
        this.validateUsername = debounce(async () => {
            await this.checkUsername();
            if (this.state.valid !== undefined) {
                this.props.onChange(
                    new FormValue<string>(this.state.username, this.state.valid)
                )
            }
        }, 500)
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props : IUsernameInputProps) {
        this.setState({
            username: props.value ? props.value : this.state.username,
            valid: props.registering ? this.state.valid : undefined
        })
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
            const res = await Axios.get(`/api/user/registration/available/${this.state.username}`);
            this.setState({
                valid: res.data.data.available,
                message: res.data.data.available ? "" : "Username has been taken"
            })
        } catch (error) {
            this.setState({
                message: "Failed to check if username is available"
            })
        }
    }

    private onChange(formValue : IFormValue<string>) {
        this.setState({
            username: formValue.value
        }, () => {
            this.props.onChange(formValue);
            if (this.props.registering) {
                this.validateUsername();
            }
        })
    }
}