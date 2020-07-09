import React from "react";
import IAuthenticationLayoutProps from "./IAuthenticationLayoutProps";
import PageLayout from "../PageLayout";
import AuthenticationBackground from "./AuthenticationBackground";
import AuthenticationContainer from "./AuthenticationContainer";
import Logo from "../../Components/Logo";
import AuthenticationLayoutTitle from "./AuthenticationLayoutTitle";

export default class AuthenticationLayout extends React.Component<IAuthenticationLayoutProps> {
    componentDidCatch(error : any) {
        throw error;
    }

    render() {
        return (
            <PageLayout pageTitle={this.props.pageTitle}>
                <AuthenticationBackground>
                    <AuthenticationContainer>
                        <Logo />
                        <AuthenticationLayoutTitle>{this.props.pageTitle}</AuthenticationLayoutTitle>
                        {this.props.children}
                    </AuthenticationContainer>
                </AuthenticationBackground>
            </PageLayout>
        )
    }
}