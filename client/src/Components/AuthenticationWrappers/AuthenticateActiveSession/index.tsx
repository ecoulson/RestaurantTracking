import React from "react";
import Cookie from "../../../lib/Cookie";
import Axios from "axios";
import AppHistory from "../../../AppHistory";
import IAuthenticationWrapperProps from "../IAuthenticationWrapperProps";

export default class AuthenticateActiveSession extends React.Component<IAuthenticationWrapperProps> {
    async componentWillMount() {
        const token = Cookie.getCookie("token");
        if (token) {
            const res = await Axios.get(`/authentication/is_session_active`)
            console.log(res.data.data);
            if (!res.data.data.isActive) {
                this.props.showError("Session has expired", 5000)
                AppHistory.push("/login")
            }
        } else {
            this.props.showError("You must login", 5000)
            AppHistory.push("/login")
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