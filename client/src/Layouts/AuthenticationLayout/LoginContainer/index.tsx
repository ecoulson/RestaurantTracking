import React from "react";
import LoginLink from "./LoginLink";
import "./index.css"

export default class LoginContainer extends React.Component {
    render() {
        return (
            <div className="user-sign-up-container">
                <p className="user-sign-up-container-text">Already have an account?</p>
                <LoginLink />
            </div>
        )
    }
}