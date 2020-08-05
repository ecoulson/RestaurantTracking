import React from "react";
import IAuthenticationLayoutProps from "./IAuthenticationLayoutProps";
import PageLayout from "../PageLayout";
import AuthenticationBackground from "./AuthenticationBackground";
import AuthenticationContainer from "./AuthenticationContainer";
import Logo from "../../Components/Logo";
import AuthenticationLayoutTitle from "./AuthenticationLayoutTitle";
import AuthenticationMenu from "./AuthenticationMenu";
import "./index.css"
import Icon from "../../Components/Icon";
import IconType from "../../Components/Icon/IconTypes";
import { Link } from "react-router-dom";
import IAuthenticationLayoutState from "./IAuthenticationLayoutState";

export default class AuthenticationLayout extends React.Component<IAuthenticationLayoutProps, IAuthenticationLayoutState> {
    constructor(props : IAuthenticationLayoutProps) {
        super(props);
        this.state = {
            hasRendered: false,
            isVisible: false
        }
    }

    render() {
        return (
            <PageLayout pageTitle={this.props.pageTitle}>
                <AuthenticationBackground>
                    <AuthenticationContainer>
                        <div className={`authentication-header ${this.getClass()}`}>
                            <Link to="/">
                                <Logo dark={this.state.isVisible} noTitle />
                            </Link>
                            <h1 className="authentication-header-title">Adapt</h1>
                            <div
                                onClick={() => this.setState({ isVisible: !this.state.isVisible })} 
                                className="authentication-header-icon-container">
                                <Icon 
                                    width={30} 
                                    height={30}
                                    icon={IconType.HamburgerMenu} 
                                    color={this.getColor()} />
                            </div>
                        </div>
                        <AuthenticationMenu isVisible={this.state.isVisible} />
                        <AuthenticationLayoutTitle>{this.props.pageTitle}</AuthenticationLayoutTitle>
                        {this.props.children}
                    </AuthenticationContainer>
                </AuthenticationBackground>
            </PageLayout>
        )
    }

    componentDidUpdate() {
        if (this.state.hasRendered || this.state.isVisible) {
            if (!this.state.hasRendered) {
                this.setState({
                    hasRendered: true
                })
            }
        }
    }

    getClass() {
        if (this.state.hasRendered) {
            return this.state.isVisible ?
            "hero-show" : "hero-hide"
        }
        return "";
    }

    getColor() {
        return !this.state.isVisible ? "black" : "white"
    }
}