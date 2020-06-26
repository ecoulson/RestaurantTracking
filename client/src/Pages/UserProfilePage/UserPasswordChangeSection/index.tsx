import React from "react";
import UserProfileSection from "../UserProfileSection";
import PasswordInput from "../../../Components/PasswordInput";
import Submit from "../../../Components/Submit";
import UserProfileSectionTitle from "../UserProfileSectionTitle";
import IUserPasswordChangeSectionState from "./IUserPasswordChangeSectionState";
import FormValue from "../../../Components/FormInput/FormValue";
import ToastType from "../../../Components/Toast/ToastType";
import Toast from "../../../Components/Toast";
import IFormValue from "../../../Components/FormInput/IFormValue";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";

export default class UserPasswordChangeSection extends React.Component<any, IUserPasswordChangeSectionState> {
    constructor(props : any) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: new FormValue("", false),
            message: "",
            type: ToastType.Error
        }

        this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    }

    render() {
        return (
            <UserProfileSection>
                <Toast type={this.state.type} message={this.state.message} />
                <UserProfileSectionTitle>Change Password</UserProfileSectionTitle>
                <PasswordInput 
                    iconColor="#AAAAAA" 
                    label="Current Password"
                    placeholder="Enter your current password" 
                    onChange={this.handleCurrentPassword} />
                <PasswordInput 
                    iconColor="#AAAAAA" 
                    registering 
                    label="New Password"
                    placeholder="Enter your new password" 
                    onChange={this.handleNewPassword} />
                <Submit onClick={this.handlePasswordUpdate}>Update</Submit>
            </UserProfileSection>
        )
    }

    private handleCurrentPassword(password : IFormValue<string>) {
        this.setState({
            currentPassword: password.value
        })
    }

    private handleNewPassword(password : IFormValue<string>) {
        this.setState({
            newPassword: password
        })
    }

    private async handlePasswordUpdate() {
        console.log(this.state);
        if (this.state.currentPassword !== "" && this.state.newPassword.valid) {
            try {
                await Axios.put("/api/user/password", {
                    currentPassword: this.state.currentPassword,
                    newPassword: this.state.newPassword.value
                }, {
                    headers: {
                        "Authorization": `Bearer ${Cookie.getCookie("token")}`
                    }
                });
                this.setState({
                    type: ToastType.Success,
                    message: "Successfully changed your password"
                })
                setTimeout(() => {
                    this.setState({
                        message: "",
                    })
                }, 3000)
            } catch (error) {
                this.setState({
                    type: ToastType.Error,
                    message: "Failed to change password"
                })
                setTimeout(() => {
                    this.setState({
                        message: "",
                    })
                }, 3000)
            }
        } else {
            this.setState({
                message: "Please fix errors in the change password section",
                type: ToastType.Error
            })
            setTimeout(() => {
                this.setState({
                    message: "",
                })
            }, 3000)
        }
    }
}