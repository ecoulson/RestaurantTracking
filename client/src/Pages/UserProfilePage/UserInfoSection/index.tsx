import React from "react";
import BasicSection from "../../../Layouts/BasicLayout/BasicSection";
import UsernameInput from "../../../Components/UsernameInput";
import EmailInput from "../../../Components/EmailInput";
import FullNameInput from "../../../Components/FullNameInput";
import Button from "../../../Components/Button";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import IUserInfoSectionProps from "./IUserInfoSectionProps";
import IUserInfoSectionState from "./IUserInfoSectionState";
import IFormValue from "../../../Components/FormInput/IFormValue";
import FormValue from "../../../Components/FormInput/FormValue";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";
import ToastType from "../../../Components/Toast/ToastType";
import Toast from "../../../Components/Toast";
import Form from "../../../Components/Form";

export default class UserInfoSection extends React.Component<IUserInfoSectionProps, IUserInfoSectionState> {
    constructor(props : IUserInfoSectionProps) {
        super(props);
        this.state = {
            username: new FormValue<string>("", false),
            email: new FormValue<string>("", false),
            fullName: new FormValue<string[]>([], false),
            message: "",
            type: ToastType.Error
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentWillReceiveProps(props : IUserInfoSectionProps) {
        this.setState({
            username: new FormValue<string>(props.username, true),
            email: new FormValue<string>(props.email, true),
            fullName: new FormValue<string[]>([props.firstName, props.lastName], true),
        });
    }

    render() {
        return(
            <BasicSection>
                <Toast type={this.state.type} message={this.state.message} />
                <BasicSectionTitle>Profile Information</BasicSectionTitle>
                <Form onSubmit={this.updateProfile}>
                    <UsernameInput
                        value={this.state.username.value} 
                        whitelist={[this.props.username]}
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        registering
                        onChange={this.handleUsernameChange} />
                    <EmailInput 
                        value={this.state.email.value}
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleEmailChange} />
                    <FullNameInput 
                        value={this.state.fullName.value}
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleFullNameChange} />
                    <Button submit>Update</Button>
                </Form>
            </BasicSection>
        )
    }

    private handleUsernameChange(username : IFormValue<string>) {
        this.setState({
            username,
        })
    }

    private handleEmailChange(email : IFormValue<string>) {
        this.setState({ email })
    }

    private handleFullNameChange(fullName : IFormValue<string[]>) {
        this.setState({ fullName });
    }

    private async updateProfile() {
        if (this.isValidProfile()) {
            try {
                await Axios.put(`/api/user/`, {
                    email: this.state.email.value,
                    username: this.state.username.value,
                    firstName: this.state.fullName.value[0],
                    lastName: this.state.fullName.value.length > 1 ? 
                        this.state.fullName.value[this.state.fullName.value.length - 1] :
                        ""
                }, {
                    headers: {
                        "Authorization": `Bearer ${Cookie.getCookie("token")}`
                    }
                })
                this.setState({
                    type: ToastType.Success,
                    message: "Successfully updated your profile"
                })
                setTimeout(() => {
                    this.setState({
                        type: ToastType.Error,
                        message: ""
                    })
                }, 3000)
            } catch (error) {
                this.setState({
                    type: ToastType.Error,
                    message: "Failed to update profile information"
                })
                setTimeout(() => {
                    this.setState({
                        type: ToastType.Error,
                        message: ""
                    })
                }, 3000)
            }
        } else {
            this.setState({
                type: ToastType.Error,
                message: "Please correct errors in your profile information"
            })
            setTimeout(() => {
                this.setState({
                    type: ToastType.Error,
                    message: ""
                })
            }, 3000)
        }
    }

    private isValidProfile() {
        return this.state.email.valid && this.state.fullName.valid && 
            this.state.username.valid;
    }
}