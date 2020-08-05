import React, { RefObject } from "react";
import CheckInLayout from "../../../Layouts/CheckInLayout";
import IVerifyAnonymousAccountProps from "./IVerifyAnonymousAccountProps";
import RegisterAccountPage from "../OrganizationLoginPage/RegisterAccountPage";
import IVerifyAnonymousAccountState from "./IVerifyAnonymousAccountState";
import SyncCheckInsRequest from "../../../API/SyncCheckInsRequest";
import AppHistory from "../../../AppHistory";
import OrganizationName from "../Components/OrganizationName";
import IResponse from "../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetOrganizationNameRequest from "../../../API/GetOrganizationNameRequest";
import Cookie from "../../../lib/Cookie";
import ISyncCheckInsResponse from "../../../API/SyncCheckInsRequest/ISyncCheckInsResponse";

export default class VerifyAnonymousAccountPage extends React.Component<IVerifyAnonymousAccountProps, IVerifyAnonymousAccountState> {
    private pageRef : RefObject<RegisterAccountPage>;
    private currentAccessToken: string;

    constructor(props : IVerifyAnonymousAccountProps) {
        super(props);
        this.state = {
            shouldSyncAccount: false,
            password: "",
            username: "",
            organizationName: ""
        }
        this.pageRef = React.createRef();
        this.onAccountCreate = this.onAccountCreate.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onError = this.onError.bind(this);
        this.currentAccessToken = Cookie.getCookie("token") as string;
    }

    render() {
        return(
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Verify Anonymous Account">
                <GetOrganizationNameRequest
                    send
                    organizationId={this.props.match.params.organizationId}
                    onComplete={this.onOrganizationName} />
                <SyncCheckInsRequest 
                    send={this.state.shouldSyncAccount}
                    username={this.state.username}
                    password={this.state.password}
                    onComplete={this.onComplete}
                    onError={this.onError}
                    organizationId={this.props.match.params.organizationId} />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <RegisterAccountPage ref={this.pageRef} onAccountCreate={this.onAccountCreate} {...this.props} />
            </CheckInLayout>
        )
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }

    onComplete(response : IResponse<ISyncCheckInsResponse>) {
        Cookie.setCookie("token", response.data.token, 365);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }

    onError() {
        this.setState({
            shouldSyncAccount: false
        })
    }

    onAccountCreate() {
        const password = this.pageRef.current?.state.password.value;
        const username = this.pageRef.current?.state.username.value;
        Cookie.setCookie("pin_email", this.pageRef.current?.state.email.value as string, 365)
        Cookie.eraseCookie("token");
        Cookie.setCookie("token", this.currentAccessToken, 365);
        this.setState({
            shouldSyncAccount: true,
            password: password ? password : "",
            username: username ? username : ""
        })
    }
}