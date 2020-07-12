import React from "react";
import IUnauthenticatedAccessProps from "./IUnauthenticatedAccessProps";
import IAuthenticationWrapperProps from "../IAuthenticationWrapperProps";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import { isSessionActive } from "../../../API";

export default class UnauthenticatedAccessWrapper extends React.Component<IUnauthenticatedAccessProps & IAuthenticationWrapperProps> {
    async componentDidMount() {
        const token = Cookie.getCookie("token");
        if (token) {
            this.props.showError("You are already logged in", 5000)
            return AppHistory.push(this.props.to)
        }
        if  (await isSessionActive()) {
            this.props.showError("You are already logged in", 5000);
            return AppHistory.push(this.props.to);
        }
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}