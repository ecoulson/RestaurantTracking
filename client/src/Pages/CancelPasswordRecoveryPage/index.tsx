import React from "react";
import AuthenticationBackground from "../../Components/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Components/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../Components/Logo";
import AuthenticationLayoutTitle from "../../Components/AuthenticationLayout/AuthenticationLayoutTitle";
import AuthenticationLayoutText from "../../Components/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../Components/AuthenticationLayout/LoginContainer";
import ICancelPasswordRecoveryPageState from "./ICancelPasswordRecoveryPageState";
import Toast from "../../Components/Toast";
import ToastType from "../../Components/Toast/ToastType";
import Axios from "axios";

export default class CancelPasswordRecoveryPage extends React.Component<{}, ICancelPasswordRecoveryPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: ""
        }
    }

    async componentWillMount() {
        try {
            const params = new URLSearchParams(window.location.search);
            await Axios.get(
                `/user/password_recovery/cancel_recover?email=${params.get("email")}&token=${params.get("token")}`
            );
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
                    <AuthenticationLayoutTitle>Recovery Canceled</AuthenticationLayoutTitle>
                    <AuthenticationLayoutText>Password recovery has been canceled</AuthenticationLayoutText>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }
}