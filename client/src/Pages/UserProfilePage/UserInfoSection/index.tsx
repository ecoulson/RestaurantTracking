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
import Form from "../../../Components/Form";
import IState from "../../../Store/IState";
import { removeToast, addToast } from "../../../Store/Toast/actions";
import { connect, ConnectedProps } from "react-redux";
import wait from "../../../lib/Wait";
import { UserActions } from "../../../Store/User/types";

class UserInfoSection extends React.Component<Props, IUserInfoSectionState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            username: new FormValue<string>("", false),
            email: new FormValue<string>("", false),
            fullName: new FormValue<string[]>([], false)
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
                <BasicSectionTitle>Profile Information</BasicSectionTitle>
                <Form onSubmit={this.updateProfile}>
                    <UsernameInput
                        value={this.state.username.value} 
                        whitelist={[this.props.username]}
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        id="username"
                        registering
                        onChange={this.handleUsernameChange} />
                    <EmailInput 
                        value={this.state.email.value}
                        id="email"
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleEmailChange} />
                    <FullNameInput 
                        value={this.state.fullName.value}
                        id="name"
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
                this.props.setUser({
                    profilePicture: this.props.user.profilePicture,
                    username: this.state.username.value,
                    organizations: this.props.user.organizations,
                    email: this.state.email.value,
                    firstName: this.state.fullName.value[0],
                    lastName: this.state.fullName.value.length > 1 ? 
                    this.state.fullName.value[this.state.fullName.value.length - 1] :
                    ""
                })
                const toast = this.props.addToast("Successfully updated your profile", ToastType.Success)
                await wait(3000);
                this.props.removeToast(toast.id)
            } catch (error) {
                const toast = this.props.addToast("Failed to update profile information", ToastType.Error)
                await wait(3000);
                this.props.removeToast(toast.id)
            }
        } else {
            const toast = this.props.addToast("Please correct errors in your profile information", ToastType.Error)
            await wait(3000);
            this.props.removeToast(toast.id)
        }
    }

    private isValidProfile() {
        return this.state.email.valid && this.state.fullName.valid && 
            this.state.username.valid;
    }
}

const mapState = (state : IState) => {
    return {
        user: state.user
    }
}

const mapDispatch = {
    removeToast: removeToast,
    addToast: addToast,
    setUser: (user : any) => ({
        type: UserActions.SET,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        organizations: user.organizations
    }),
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IUserInfoSectionProps

export default connector(UserInfoSection)