import React from "react";
import IUnauthenticatedAccessProps from "./IUnauthenticatedAccessProps";
import IAuthenticationWrapperProps from "../IAuthenticationWrapperProps";
import Cookie from "../../../lib/Cookie";
import Axios from "axios";
import AppHistory from "../../../AppHistory";

export default class UnauthenticatedAccessWrapper extends React.Component<IUnauthenticatedAccessProps & IAuthenticationWrapperProps> {
    async componentWillMount() {
        const token = Cookie.getCookie("token");
        if (!token) {
            const res = await Axios.get(`/api/authentication/is_session_active`)
            if (res.data.data.isActive) {
                this.props.showError("You are already logged in", 5000)
                AppHistory.push(this.props.to)
            }
        } else {
            this.props.showError("You are already logged in", 5000)
            AppHistory.push(this.props.to)
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