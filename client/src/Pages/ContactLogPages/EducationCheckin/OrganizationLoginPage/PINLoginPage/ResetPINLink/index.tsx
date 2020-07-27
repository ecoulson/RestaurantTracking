import React from "react";
import "./index.css";
import IResetPINLinkState from "./IResetPINLinkState";
import RecoverPasswordRequest from "../../../../../../API/RecoverPasswordRequest";
import Cookie from "../../../../../../lib/Cookie";
import IResetPINLinkProps from "./IResetPINLinkProps";

export default class ResetPINLink extends React.Component<IResetPINLinkProps, IResetPINLinkState> {
    constructor(props: IResetPINLinkProps) {
        super(props);
        this.state = {
            send: false
        }

        this.onClick = this.onClick.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <span onClick={this.onClick} className="reset-link">
                <RecoverPasswordRequest 
                    url={`/api/organization/account/${this.props.organizationId}/recover`}
                    send={this.state.send}
                    onComplete={this.onComplete}
                    onError={this.onComplete}
                    email={Cookie.getCookie("pin_email") as string} />
                Reset PIN
            </span>
        )
    }

    onClick() {
        this.setState({
            send: true
        })
    }

    onComplete() {
        this.setState({
            send: false
        })
    }
}