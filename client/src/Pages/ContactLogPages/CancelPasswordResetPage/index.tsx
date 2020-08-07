import React from "react";
import OrganizationName from "../Components/OrganizationName";
import CancelPasswordRecoveryRequest from "../../../API/CancelPasswordRecoveryRequest";
import ICancelPasswordResetPageProps from "./ICancelPasswordResetPageProps";
import AppHistory from "../../../AppHistory";
import CheckInTitle from "../Components/CheckInTitle";

export default class CancelPasswordResetPage extends React.Component<ICancelPasswordResetPageProps> {
    private urlParams : URLSearchParams

    constructor(props : ICancelPasswordResetPageProps) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <>
                <CancelPasswordRecoveryRequest 
                    send
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string}
                    />
                <OrganizationName organizationId={this.props.match.params.organizationId} />
                <CheckInTitle>Cancel Password Reset</CheckInTitle>
            </>
        )
    }

    onComplete() {
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`)
    }
}