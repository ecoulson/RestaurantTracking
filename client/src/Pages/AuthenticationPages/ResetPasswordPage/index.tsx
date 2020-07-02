import React from "react";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../../Components/Logo";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import Form from "../../../Components/Form";
import PasswordInput from "../../../Components/PasswordInput";
import Button from "../../../Components/Button";
import IResetPasswordPageState from "./IResetPasswordPageState";
import FormValue from "../../../Components/FormInput/FormValue";
import Axios from "axios";
import ToastType from "../../../Components/Toast/ToastType";
import Toast from "../../../Components/Toast";

export default class ResetPasswordPage extends React.Component<{}, IResetPasswordPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            message: "",
            type: ToastType.Error
        }

        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = "Reset Password"
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={this.state.type} message={this.state.message} />
                    <Logo />
                    <AuthenticationLayoutTitle>Reset Password</AuthenticationLayoutTitle>
                    <AuthenticationLayoutText>Reset your password below</AuthenticationLayoutText>
                    <Form onSubmit={this.handleSubmit} isSubmitting={false}>
                        <PasswordInput 
                            registering 
                            iconColor="#AAAAAA" 
                            hoverColor="#1B2D42"
                            onChange={this.handlePassword}/>
                        <Button
                            submit 
                            visible={this.state.password.valid}>
                            Reset Password
                        </Button>
                    </Form>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }

    private handlePassword(password: FormValue<string>) {
        this.setState({ password })
    }

    private async handleSubmit() {
        if (this.state.password.valid) {
            try {
                const params = new URLSearchParams(window.location.search);
                await Axios.post("/api/user/password_recovery/reset", {
                    password: this.state.password.value,
                    email: params.get("email"),
                    token: params.get("token")
                });
                this.setState({
                    message: "Successfully reset password",
                    type: ToastType.Success
                })
            } catch (error) {
                this.setState({
                    message: "Failed to reset password",
                    type: ToastType.Error
                })
            }
        }
    }
}