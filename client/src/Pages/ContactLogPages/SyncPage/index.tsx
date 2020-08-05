import React from 'react';
import CheckInLayout from '../../../Layouts/CheckInLayout';
import ISyncPageProps from './ISyncPageProps';
import OrganizationName from '../Components/OrganizationName';
import { Link } from 'react-router-dom';
import Form from '../../../Components/Form';
import UsernameInput from '../../../Components/UsernameInput';
import PasswordInput from '../../../Components/PasswordInput';
import Button from '../../../Components/Button';
import Instructions from '../Components/Instructions';
import "./index.css";
import ISyncPageState from './ISyncPageState';
import IFormValue from '../../../Components/FormInput/IFormValue';
import IResponse from '../../../API/IResponse';
import ISyncCheckInsResponse from '../../../API/SyncCheckInsRequest/ISyncCheckInsResponse';
import Cookie from '../../../lib/Cookie';
import SyncCheckInsRequest from '../../../API/SyncCheckInsRequest';
import AppHistory from '../../../AppHistory';
import IsUserVerifiedRequest from '../../../API/IsUserVerifiedRequest';
import IIsUserVerifiedResponse from '../../../API/IsUserVerifiedRequest/IIsUserVerifiedResponse';
import CheckInTitle from '../Components/CheckInTitle';

export default class SyncPage extends React.Component<ISyncPageProps, ISyncPageState> {
    constructor(props : ISyncPageProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            shouldSyncAccounts: false,
            hasFetched: false
        }
        this.onSync = this.onSync.bind(this);
        this.onError = this.onError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.onVerificationCheck = this.onVerificationCheck.bind(this);
    }

    render() {
        return (
            <CheckInLayout pageTitle="Sync Page" organizationId={this.props.match.params.organizationId}>
                <IsUserVerifiedRequest send onComplete={this.onVerificationCheck}/>
                {
                    this.state.hasFetched ?
                    (
                        <>
                            <SyncCheckInsRequest 
                                send={this.state.shouldSyncAccounts}
                                organizationId={this.props.match.params.organizationId}
                                password={this.state.password}
                                username={this.state.username}
                                onComplete={this.onSync}
                                onError={this.onError} />
                            <CheckInTitle>Sync Account</CheckInTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <UsernameInput dark id="username" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleUsername} />
                                <PasswordInput dark id="password" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handlePassword} />
                                <Instructions>Login to your account to sync your check-ins.</Instructions>
                                <Instructions>If you do not have an account, 
                                    <Link className="sync-verify-link" to={`/check-in/${this.props.match.params.organizationId}/verify`}>Verify your account here</Link>
                                </Instructions>
                                <Button dark submit>Sync Account</Button>
                            </Form>
                        </>
                    ) : null
                }
            </CheckInLayout>
        );
    }

    onVerificationCheck(response : IResponse<IIsUserVerifiedResponse>) {
        if (!response.data.anonymous && !response.data.verified) {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/verify-code`)
        } else {
            this.setState({
                hasFetched: true
            })
        }
    }

    handleSubmit() {
        this.setState({
            shouldSyncAccounts: true,
        })
    }

    onSync(response : IResponse<ISyncCheckInsResponse>) {
        Cookie.setCookie("token", response.data.token, 365);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}`)
    }

    onError() {
        this.setState({
            shouldSyncAccounts: false
        })
    }

    handleUsername(username : IFormValue<string>) {
        this.setState({ username: username.value })
    }

    handlePassword(password : IFormValue<string>) {
        this.setState({ password: password.value })
    }
}