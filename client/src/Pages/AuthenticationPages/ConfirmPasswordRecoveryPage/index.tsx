import React from "react";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../../Components/Logo";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import IConfirmPasswordRecoveryPageState from "./IConfirmPasswordRecoveryPageState";
import ToastType from "../../../Components/Toast/ToastType";
import Toast from "../../../Components/Toast";
import Axios from "axios";
import AppHistory from "../../../AppHistory";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";

export default class ConfirmPasswordRecoveryPage extends React.Component<{}, IConfirmPasswordRecoveryPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: ""
        }
    }

    async componentDidMount() {
        document.title = "Confirm Password Recovery"
        try {
            const params = new URLSearchParams(window.location.search)
            await Axios.get(
                `/api/user/password_recovery/confirm?email=${params.get("email")}&token=${params.get("token")}`
            )
            AppHistory.push(
                `/reset-password?email=${params.get("email")}&token=${params.get("token")}`
            )
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
                    <AuthenticationLayoutTitle>Confirmed Recovery</AuthenticationLayoutTitle>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }
}