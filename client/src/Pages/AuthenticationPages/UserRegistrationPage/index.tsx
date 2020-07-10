import React from "react";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import Form from "../../../Components/Form";
import UsernameInput from "../../../Components/UsernameInput";
import PasswordInput from "../../../Components/PasswordInput";
import Button from "../../../Components/Button";
import EmailInput from "../../../Components/EmailInput";
import FullNameInput from "../../../Components/FullNameInput";
import "./index.css"
import IUserRegistrationPageState from "./IUserRegistrationPageState";
import FormValue from "../../../Components/FormInput/FormValue";
import IFormValue from "../../../Components/FormInput/IFormValue";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import UserRegistrationRequest from "../../../API/UserRegistrationRequest";

export default class UserRegistrationPage extends React.Component<{}, IUserRegistrationPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: new FormValue<string>("", false),
            username: new FormValue<string>("", false),
            password: new FormValue<string>("", false),
            fullName: new FormValue<string[]>([], false),
            send: false
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handleFullName = this.handleFullName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.register = this.register.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Sign Up">
                <UserRegistrationRequest
                    send={this.state.send}
                    onComplete={this.onComplete}
                    username={this.state.username.value}
                    email={this.state.email.value}
                    firstName={this.state.fullName.value[0]}
                    lastName={this.getLastName()}
                    password={this.state.password.value}
                    />
                <Form onSubmit={this.register}>
                    <UsernameInput 
                        registering 
                        id="register-username" 
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleUsername} />
                    <FullNameInput 
                        id="register-fullname" 
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleFullName} />
                    <EmailInput 
                        id="register-email" 
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleEmail} />
                    <PasswordInput 
                        registering 
                        id="register-password" 
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handlePassword} />
                    <Button
                        submit 
                        visible={this.canSubmit()}>
                        Create Account
                    </Button>
                </Form>
                <LoginContainer />
            </AuthenticationLayout>
        )
    }

    private getLastName() {
        return this.state.fullName.value.length === 1 ? 
            "" : 
            this.state.fullName.value[this.state.fullName.value.length - 1]
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

    private handleFullName(fullName : IFormValue<string[]>) {
        this.setState({ fullName })
    }

    private canSubmit() {
        return this.state.email.valid &&
                this.state.fullName.valid &&
                this.state.password.valid &&
                this.state.username.valid;
    }

    private async register() {
        if (this.canSubmit()) {
            this.setState({
                send: true
            })
        }
    }

    private onComplete() {
        this.setState({
            send: false
        })
    }
}