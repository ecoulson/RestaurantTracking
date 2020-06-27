import React from "react";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../../Components/Logo";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import ICancelPasswordRecoveryPageState from "./ICancelPasswordRecoveryPageState";
import Toast from "../../../Components/Toast";
import ToastType from "../../../Components/Toast/ToastType";
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
                `/api/user/password_recovery/cancel_recover?email=${params.get("email")}&token=${params.get("token")}`
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