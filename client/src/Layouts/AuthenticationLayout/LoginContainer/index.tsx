import React from "react";
import LoginLink from "./LoginLink";
import "./index.css"

export default class LoginContainer extends React.Component {
    render() {
        return (
            <div className="user-signup-container">
                <p className="user-signup-container-text">Already have an account?</p>
                <LoginLink />
            </div>
        )
    }
}