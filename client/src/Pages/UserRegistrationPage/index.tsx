import React from "react";
import AuthenticationBackground from "../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../Components/Logo";
import AuthenticationLayoutTitle from "../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import LoginContainer from "../../Layouts/AuthenticationLayout/LoginContainer";
import Form from "../../Components/Form";
import UsernameInput from "../../Components/UsernameInput";
import PasswordInput from "../../Components/PasswordInput";
import Submit from "../../Components/Submit";
import EmailInput from "../../Components/EmailInput";
import FullNameInput from "../../Components/FullNameInput";
import "./index.css"
import IUserRegistrationPageState from "./IUserRegistrationPageState";
import FormValue from "../../Components/FormInput/FormValue";
import IFormValue from "../../Components/FormInput/IFormValue";
import Axios from "axios";
import Toast from "../../Components/Toast";
import ToastType from "../../Components/Toast/ToastType";

export default class UserRegistrationPage extends React.Component<{}, IUserRegistrationPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: new FormValue<string>("", false),
            username: new FormValue<string>("", false),
            password: new FormValue<string>("", false),
            fullname: new FormValue<string[]>([], false),
            message: "",
            type: ToastType.Error
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handleFullname = this.handleFullname.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.register = this.register.bind(this);
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={this.state.type} message={this.state.message}/>
                    <Logo />
                    <AuthenticationLayoutTitle>Sign Up</AuthenticationLayoutTitle>
                    <Form isSubmitting={false}>
                        <UsernameInput 
                            registering 
                            id="register-username" 
                            iconColor="#AAAAAA" 
                            onChange={this.handleUsername} />
                        <FullNameInput 
                            id="register-fullname" 
                            iconColor="#AAAAAA" 
                            onChange={this.handleFullname} />
                        <EmailInput 
                            id="register-email" 
                            iconColor="#AAAAAA" 
                            onChange={this.handleEmail} />
                        <PasswordInput 
                            registering 
                            id="register-password" 
                            iconColor="#AAAAAA" 
                            onChange={this.handlePassword} />
                        <Submit 
                            visible={this.canSubmit()} 
                            onClick={this.register}>Create Account</Submit>
                    </Form>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )

    }

    private handleUsername(username : IFormValue<string>) {
        this.setState({
            username
        })
    }

    private handleEmail(email : IFormValue<string>) {
        this.setState({
            email
        })
    }

    private handlePassword(password : IFormValue<string>) {
        this.setState({
            password
        })
    }

    private handleFullname(fullname : IFormValue<string[]>) {
        this.setState({
            fullname
        })
    }

    private canSubmit() {
        return this.state.email.valid &&
                this.state.fullname.valid &&
                this.state.password.valid &&
                this.state.username.valid;
    }

    private async register() {
        if (this.canSubmit()) {
            try {
                await Axios.post("/api/user/registration/register", {
                    username: this.state.username.value,
                    email: this.state.email.value,
                    firstName: this.state.fullname.value[0],
                    lastName: this.state.fullname.value[this.state.fullname.value.length - 1],
                    password: this.state.password.value
                });
                this.setState({
                    message: "Successfully registered account, please check your email",
                    type: ToastType.Success
                })
            } catch (error) {
                this.setState({
                    message: "Failed to reigster account. Please try again later.",
                    type: ToastType.Error
                })
            }
        }
    }
}