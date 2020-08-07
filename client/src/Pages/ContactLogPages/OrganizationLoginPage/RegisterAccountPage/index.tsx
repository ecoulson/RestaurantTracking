import React from "react";
import IRegisterAccountPageProps from "./IRegisterAccountPageProps";
import Instructions from "../../Components/Instructions";
import Form from "../../../../Components/Form";
import UsernameInput from "../../../../Components/UsernameInput";
import PasswordInput from "../../../../Components/PasswordInput";
import FullNameInput from "../../../../Components/FullNameInput";
import EmailInput from "../../../../Components/EmailInput";
import Button from "../../../../Components/Button";
import "./index.css"
import RegisterOrganizationUserRequest from "../../../../API/RegisterOrganizationUserRequest";
import IRegisterAccountPageState from "./IRegisterAccountPageState";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import PINLoginRequest from "../../../../API/PINLoginRequest";
import IResponse from "../../../../API/IResponse";
import IPINLoginResponse from "../../../../API/PINLoginRequest/IPINLoginResponse";
import Cookie from "../../../../lib/Cookie";

export default class RegisterAccountPage extends React.Component<IRegisterAccountPageProps, IRegisterAccountPageState> {
    constructor(props : IRegisterAccountPageProps) {
        super(props);
        this.state = {
            shouldRegisterUser: false,
            shouldLogin: false,
            fullName: new FormValue([], false),
            username: new FormValue("", false),
            password: new FormValue("", false),
            email: new FormValue("", false)
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFullName = this.handleFullName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onError = this.onError.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} id="register-account-form">
                <PINLoginRequest 
                    send={this.state.shouldLogin}
                    onComplete={this.onLogin}
                    organizationId={this.props.match.params.organizationId}
                    password={this.state.password.value}
                    email={this.state.email.value}
                    onError={this.onError}
                    />
                <RegisterOrganizationUserRequest 
                    send={this.state.shouldRegisterUser}
                    email={this.state.email.value}
                    username={this.state.username.value}
                    password={this.state.password.value}
                    firstName={this.state.fullName.value[0]}
                    lastName={this.state.fullName.value[1]}
                    organizationId={this.props.match.params.organizationId} 
                    onError={this.onError}
                    onComplete={this.onRegister} />
                <Instructions>Create an account to check in</Instructions>
                <UsernameInput registering dark id="username" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleUsername} />
                <PasswordInput registering dark id="password" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handlePassword} />
                <br />
                <EmailInput dark id="email" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleEmail} />
                <FullNameInput dark id="full-name" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleFullName} />
                <Button submit>Create Account</Button>
            </Form>
        )
    }

    handleSubmit() {
        if (this.state.email.valid && this.state.fullName.valid && this.state.password.valid && this.state.username.valid) {
            this.setState({
                shouldRegisterUser: true
            })
        }
    }

    onRegister() {
        this.setState({
            shouldLogin: true
        })
    }

    onLogin(response: IResponse<IPINLoginResponse>) {
        Cookie.eraseCookie("checkInId");
        Cookie.eraseCookie("timeCheckedIn");
        Cookie.setCookie("token", response.data.token, 365);
        this.props.onAccountCreate()
    }

    onError() {
        this.setState({
            shouldRegisterUser: false,
            shouldLogin: false,
        })
    }

    handleUsername(username: IFormValue<string>) {
        this.setState({ username })
    }

    handlePassword(password : IFormValue<string>) {
        this.setState({ password })
    }

    handleEmail(email : IFormValue<string>) {
        this.setState({ email })
    }

    handleFullName(fullName: IFormValue<string[]>) {
        this.setState({ fullName })
    }
}