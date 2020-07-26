import React from "react";
import Button from "../../../Components/Button";
import BasicSection from "../../../Layouts/BasicLayout/BasicSection";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import IProfilePictureSectionProps from "./IProfilePictureSectionProps";
import Icon from "../../../Components/Icon";
import IconType from "../../../Components/Icon/IconTypes";
import SlideSwitch from "../../../Components/SlideSwitch";
import IProfilePictureSectionState from "./IProfilePictureSectionState";
import URLInput from "../../../Components/URLInput";
import IFormValue from "../../../Components/FormInput/IFormValue";
import ImageUploader from "../../../Components/ImageUploader";
import ProfilePictureType from "./ProfilePictureType";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";
import ToastType from "../../../Components/Toast/ToastType";
import "./index.css"
import Form from "../../../Components/Form";
import { removeToast, addToast } from "../../../Store/Toast/actions";
import IState from "../../../Store/IState";
import { connect, ConnectedProps } from "react-redux";
import wait from "../../../lib/Wait";
import { UserActions } from "../../../Store/User/types";

class ProfilePictureSection extends React.Component<Props, IProfilePictureSectionState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            profilePictureURL: props.profilePictureURL,
            inputType: ProfilePictureType.Image,
            profilePictureType: ProfilePictureType.Image,
        }
        this.handleInputTypeChange = this.handleInputTypeChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.updateProfilePicture = this.updateProfilePicture.bind(this);
    }

    componentWillReceiveProps(props : IProfilePictureSectionProps) {
        this.setState({
            profilePictureURL: props.profilePictureURL,
        });
    }

    render() {
        return (
            <BasicSection>
                <BasicSectionTitle>Profile Picture</BasicSectionTitle>
                <Form onSubmit={this.updateProfilePicture}>
                    {this.getProfilePicture()}
                    <SlideSwitch onChange={this.handleInputTypeChange}>
                        <Icon width={25} height={25} icon={IconType.Image} color="black" />
                        <Icon width={25} height={25} icon={IconType.Link} color="black" />
                    </SlideSwitch>
                    {this.getInput()}
                    <Button submit>Update</Button>
                </Form>
            </BasicSection>
        )
    }

    private getProfilePicture() {
        if (!this.state.profilePictureURL) {
            return (
                <div className="profile-icon-container">
                    <Icon width={75} height={75} icon={IconType.User} color="#AAAAAA" />
                </div>
            );
        } else {
            return <img alt="profile avatar" className="user-profile-picture" src={this.state.profilePictureURL} />
        }
    }

    private handleInputTypeChange(inputType : number) {
        this.setState({ inputType })
    }

    private getInput() {
        if (this.state.inputType === ProfilePictureType.Image) {
            return <ImageUploader 
                        value={this.state.profilePicture} 
                        onImageUpload={this.handleImageUpload}/>;
        } else {
            return <URLInput 
                        photo
                        id="photo"
                        value={this.getURL()} 
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleURLChange} />
        }
    }

    private getURL() {
        if (this.state.profilePictureType === ProfilePictureType.URL) {
            return this.state.profilePictureURL ? this.state.profilePictureURL : "";
        } else {
            return "";
        }
    }

    private handleURLChange(url : IFormValue<string>) {
        if (!url.valid) {
            this.setState({
                profilePictureURL: undefined,
                profilePicture: undefined
            })
        } else {
            this.setState({
                profilePictureURL: url.value,
                profilePicture: undefined,
                profilePictureType: ProfilePictureType.URL
            })
        }
    }

    private handleImageUpload(dataUrl : string, image : File) {
        this.setState({
            profilePictureURL: dataUrl,
            profilePicture: image,
            profilePictureType: ProfilePictureType.Image
        })
    }

    private async updateProfilePicture() {
        try {
            if (this.state.profilePictureType === ProfilePictureType.URL) {
                await Axios.post("api/user/avatar/link", {
                    link: this.state.profilePictureURL
                }, {
                    headers: {
                        "Authorization": `Bearer ${Cookie.getCookie("token")}`
                    }
                });
                this.props.setUser({
                    profilePicture: this.state.profilePictureURL,
                    username: this.props.user.username,
                    organizations: this.props.user.organizations,
                    email: this.props.user.email,
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName
                })
                const toast = this.props.addToast("Updated profile picture", ToastType.Success)
                await wait(3000)
                this.props.removeToast(toast.id)
            } else if (this.state.profilePicture) {
                const formData = new FormData();
                formData.append("avatar", this.state.profilePicture);
                await Axios.post("api/user/avatar/file", formData, {
                    headers: {
                        "Authorization": `Bearer ${Cookie.getCookie("token")}`,
                        "Content-Type": 'multipart/form-data'
                    }
                });
                this.props.setUser({
                    profilePicture: this.state.profilePictureURL,
                    username: this.props.user.username,
                    organizations: this.props.user.organizations,
                    email: this.props.user.email,
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName
                })
                const toast = this.props.addToast("Updated profile picture", ToastType.Success)
                await wait(3000)
                this.props.removeToast(toast.id)
            }
        } catch (error) {
            const toast = this.props.addToast("Failed to update profile picture", ToastType.Error)
            await wait(3000)
            this.props.removeToast(toast.id)
        }
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

type Props = PropsFromRedux & IProfilePictureSectionProps

export default connector(ProfilePictureSection)