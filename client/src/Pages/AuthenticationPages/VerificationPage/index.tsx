import React from "react";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import Logo from "../../../Components/Logo";
import Axios from "axios";
import Toast from "../../../Components/Toast";
import ToastType from "../../../Components/Toast/ToastType";
import IVerificationPageState from "./IVerificationPageState";
import AppHistory from "../../../AppHistory";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import IVerificationPageProps from "./IVerificationPageProps";

export default class VerificationPage extends React.Component<IVerificationPageProps, IVerificationPageState> {
    constructor(props: IVerificationPageProps) {
        super(props);
        this.state = {
            message: ""
        }
    }

    async componentWillMount() {
        const query = new URLSearchParams(window.location.search)
        try {
            await Axios.get(
                `/api/user/verification/verify?email=${query.get("email")}&token=${query.get("token")}`);
            this.props.showSuccess("Successfully verified account", 3000);
            AppHistory.push("/login")
        } catch (error) {
            this.setState({
                message: "Failed to verify account"
            })
        }
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={ToastType.Error} message={this.state.message}/>
                    <Logo />
                    <AuthenticationLayoutTitle>Verifying Account...</AuthenticationLayoutTitle>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }
}