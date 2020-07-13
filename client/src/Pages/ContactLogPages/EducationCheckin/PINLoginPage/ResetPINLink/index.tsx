import React from "react";
import "./index.css";
import IResetPINLink from "./IResetPINLinkState";

export default class ResetPINLink extends React.Component<{}, IResetPINLink> {
    constructor(props: {}) {
        super(props);
        this.state = {
            send: false
        }

        this.onClick = this.onClick.bind(this);
    }

    // TODO: Send Reset Pin Email Request
    // TODO: Create PIN Account and Send Verification Email

    render() {
        return (
            <span onClick={this.onClick} className="reset-link">
                Reset PIN
            </span>
        )
    }

    onClick() {
        this.setState({
            send: true
        })
    }
}