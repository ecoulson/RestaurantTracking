import React from "react";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../../Components/Logo";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import Toast from "../../../Components/Toast";
import ToastType from "../../../Components/Toast/ToastType";
import ISPamRegistrationPageState from "./ISpamRegistrationPageState";
import { handleSpamRegistration } from "../../../API";

export default class SpamRegistrationPage extends React.Component<{}, ISPamRegistrationPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: ""
        }
    }

    async componentDidMount() {
        document.title = "Spam Registration"
        const parameters = new URLSearchParams(window.location.search);
        try {
            const email = parameters.get("email");
            const token = parameters.get("token");
            if (email && token) {
                await handleSpamRegistration(email, token);
            }
        } catch (error) {
            this.setState({
                message: "Something went wrong"
            })
        }
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={ToastType.Error} message={this.state.message} />
                    <Logo />
                    <AuthenticationLayoutTitle>Spam Registration</AuthenticationLayoutTitle>
                    <AuthenticationLayoutText>We are removing your registration from our system. Apologies.</AuthenticationLayoutText>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }
}