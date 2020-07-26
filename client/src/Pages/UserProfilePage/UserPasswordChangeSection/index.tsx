import React from "react";
import BasicSection from "../../../Layouts/BasicLayout/BasicSection";
import PasswordInput from "../../../Components/PasswordInput";
import Button from "../../../Components/Button";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import IUserPasswordChangeSectionState from "./IUserPasswordChangeSectionState";
import FormValue from "../../../Components/FormInput/FormValue";
import ToastType from "../../../Components/Toast/ToastType";
import IFormValue from "../../../Components/FormInput/IFormValue";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";
import Form from "../../../Components/Form";
import IState from "../../../Store/IState";
import { removeToast, addToast } from "../../../Store/Toast/actions";
import { connect, ConnectedProps } from "react-redux";
import wait from "../../../lib/Wait";

class UserPasswordChangeSection extends React.Component<Props, IUserPasswordChangeSectionState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: new FormValue("", false),
        }

        this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    }

    render() {
        return (
            <BasicSection>
                <BasicSectionTitle>Change Password</BasicSectionTitle>
                <Form onSubmit={this.handlePasswordUpdate}>
                    <PasswordInput 
                        id="current-password"
                        iconColor="#AAAAAA" 
                        label="Current Password"
                        placeholder="Enter your current password" 
                        hoverColor="#1B2D42"
                        onChange={this.handleCurrentPassword} />
                    <PasswordInput 
                        iconColor="#AAAAAA" 
                        registering 
                        id="new-password"
                        label="New Password"
                        hoverColor="#1B2D42"
                        placeholder="Enter your new password" 
                        onChange={this.handleNewPassword} />
                    <Button submit>Update</Button>
                </Form>
            </BasicSection>
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
                const toast = this.props.addToast("Successfully changed your password", ToastType.Success)
                await wait(3000);
                this.props.removeToast(toast.id)
            } catch (error) {
                const toast = this.props.addToast("Failed to change password", ToastType.Error)
                await wait(3000);
                this.props.removeToast(toast.id);
            }
        } else {
            const toast = this.props.addToast("Please fix errors in the change password section", ToastType.Error)
            await wait(3000);
            this.props.removeToast(toast.id)
        }
    }
}

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    removeToast: removeToast,
    addToast: addToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

export default connector(UserPasswordChangeSection)