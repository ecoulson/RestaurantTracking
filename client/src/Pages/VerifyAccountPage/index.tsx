import React from "react";
import AuthenticationBackground from "../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../Components/Logo";
import Form from "../../Components/Form";
import EmailInput from "../../Components/EmailInput";
import FormValue from "../../Components/FormInput/FormValue";
import Submit from "../../Components/Submit";
import IVerifyAccountPageState from "./IVerifyAccountPageState";
import Toast from "../../Components/Toast";
import AuthenticationLayoutTitle from "../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import AuthenticationLayoutText from "../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../Layouts/AuthenticationLayout/LoginContainer";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import ToastType from "../../Components/Toast/ToastType";

export default class VerifyAccountPage extends React.Component<{}, IVerifyAccountPageState> {
    constructor(props: {}) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.state = {
            canSubmit: false,
            email: "",
            message: "",
            type: ToastType.Error
        }
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={this.state.type} message={this.state.message}/>
                    <Logo />
                    <AuthenticationLayoutTitle>Verifiy Account</AuthenticationLayoutTitle>
                    <AuthenticationLayoutText>If you can not find your verification email, get a new verification email below.</AuthenticationLayoutText>
                    <Form isSubmitting={false}>
                        <EmailInput iconColor="#AAAAAA" onChange={this.onEmailChange}/>
                        <Submit
                            onClick={this.onClick}
                            visible={this.state.canSubmit}>
                                Resend Email
                        </Submit>
                    </Form>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }

    private onEmailChange(email : FormValue<string>) {
        this.setState({
            email: email.value,
            canSubmit: email.valid
        })
    }

    private onClick() {
        if (this.state.canSubmit) {
            try {
                this.handleSuccessfulResend();
            } catch (error) {
                this.handleUnsuccessfulResend(error);
            }
        }
    }

    private async handleSuccessfulResend() {
        await Axios.post("/api/user/registration/send_verification", {
            email: this.state.email
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })
        this.setState({
            message: "Resent verification email",
            type: ToastType.Success
        })
    }

    private handleUnsuccessfulResend(error : any) {
        if (error.response.status === 500) {
            this.setState({
                message: "Failed to send verification email",
                type: ToastType.Error
            })
        } else {
            this.setState({
                message: "No account associated with that email",
                type: ToastType.Error
            })
        }
    }
}