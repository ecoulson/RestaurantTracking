import React from "react";
import SignUpLink from "./SignUpLink";
import "./index.css"

export default class SignUpContainer extends React.Component {
    render() {
        return (
            <div className="user-signup-container">
                <p className="user-signup-container-text">Don't have an account?</p>
                <SignUpLink />
            </div>
        )
    }
}