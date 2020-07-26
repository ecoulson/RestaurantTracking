import React from "react";
import IUsernameInputProps from "./IUsernameInputProps";
import IUsernameInputState from "./IUsernameInputState";
import IFormValue from "../FormInput/IFormValue";
import IconType from "../Icon/IconTypes";
import FormInput from "../FormInput";
import { debounce } from "../../lib/Debounce";
import Axios from "axios";
import FormValue from "../FormInput/FormValue";
import { removeToast, addToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";
import { ConnectedProps, connect } from "react-redux";
import ToastType from "../Toast/ToastType";

export class UsernameInput extends React.Component<Props, IUsernameInputState> {
    private validateUsername : () => void;

    constructor(props: Props) {
        super(props);
        this.state = {
            username: props.value ? props.value : "",
            valid: props.registering ? true : undefined,
            message: null
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

    static getDerivedStateFromProps(props : IUsernameInputProps, state : IUsernameInputState) : IUsernameInputState {
        return {
            username: props.value ? props.value : state.username,
            valid: props.registering ? state.valid : undefined,
            message: state.message
        }
    }

    render() {
        return (
            <FormInput
                value={this.state.username}
                id={this.props.id}
                iconColor={this.props.iconColor}
                isValid={this.state.valid}
                hoverColor={this.props.hoverColor}
                type="text"
                label="Username"
                name="username"
                autocomplete="username"
                icon={IconType.User}
                placeHolder="Enter your username"
                onChange={this.onChange} />
        )
    }

    private async checkUsername() {
        if (this.state.message) {
            this.props.removeToast(this.state.message.id)
        }
        try {
            if (this.state.username === "") {
                return this.setState({
                    valid: true,
                    message: null
                })
            } else if (this.props.whitelist && this.props.whitelist.includes(this.state.username)) {
                return this.setState({
                    valid: true,
                    message: null
                })
            } else {
                const res = await Axios.get(`/api/user/registration/available/${this.state.username}`);
                this.setState({
                    valid: res.data.data.available,
                    message: res.data.data.available ? null : this.props.addToast("Username has been taken", ToastType.Error)
                })
            }
        } catch (error) {
            this.setState({
                message: this.props.addToast("Failed to check if username is available", ToastType.Error)
            })
        }
    }

    private async onChange(username : IFormValue<string>) {
        await this.asyncSetState({
            ...this.state,
            username: username.value,
        })
        this.props.onChange(username);
        if (this.props.registering) {
            this.validateUsername();
        }
    }

    private asyncSetState(state : IUsernameInputState) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }
}

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IUsernameInputProps

export default connector(UsernameInput);