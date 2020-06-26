import React from "react";
import Submit from "../../../Components/Submit";
import UserProfileSection from "../UserProfileSection";
import UserProfileSectionTitle from "../UserProfileSectionTitle";
import IProfilePictureSectionProps from "./IProfilePictureSectionProps";
import Icon from "../../../Components/Icon";
import IconType from "../../../Components/Icon/IconTypes";
import "./index.css"
import SlideSwitch from "../../../Components/SlideSwitch";
import IProfilePictureSectionState from "./IProfilePictureSectionState";
import URLInput from "../../../Components/URLInput";
import IFormValue from "../../../Components/FormInput/IFormValue";
import ImageUploader from "../../../Components/ImageUploader";
import ProfilePictureType from "./ProfilePictureType";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";
import ToastType from "../../../Components/Toast/ToastType";
import Toast from "../../../Components/Toast";

export default class ProfilePictureSection extends React.Component<IProfilePictureSectionProps, IProfilePictureSectionState> {
    constructor(props : IProfilePictureSectionProps) {
        super(props);
        this.state = {
            profilePictureURL: props.profilePictureURL,
            inputType: ProfilePictureType.Image,
            profilePictureType: ProfilePictureType.Image,
            message: "",
            type: ToastType.Error
        }
        this.handleInputTypeChange = this.handleInputTypeChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.updateProfilePicture = this.updateProfilePicture.bind(this);
    }

    componentWillReceiveProps(props : IProfilePictureSectionProps) {
        this.setState({
            profilePictureURL: props.profilePictureURL
        })
    }

    render() {
        return (
            <UserProfileSection>
                <Toast type={this.state.type} message={this.state.message} />
                <UserProfileSectionTitle>Profile Picture</UserProfileSectionTitle>
                {this.getProfilePicture()}
                <SlideSwitch onChange={this.handleInputTypeChange}>
                    <Icon width={25} height={25} icon={IconType.Image} color="black" />
                    <Icon width={25} height={25} icon={IconType.Link} color="black" />
                </SlideSwitch>
                {this.getInput()}
                <Submit onClick={this.updateProfilePicture}>Update</Submit>
            </UserProfileSection>
        )
    }

    private getProfilePicture() {
        if (!this.state.profilePictureURL) {
            return <Icon width={75} height={75} icon={IconType.User} color="#AAAAAA" />
        } else {
            return <img alt="profile avatar" className="user-profile-picture" src={this.state.profilePictureURL} />
        }
    }

    private handleInputTypeChange(inputType : number) {
        this.setState({ inputType })
    }

    private getInput() {
        if (this.state.inputType === ProfilePictureType.Image) {
            return <ImageUploader value={this.state.profilePicture} onImageUpload={this.handleImageUpload}/>;
        } else {
            return <URLInput value={this.getURL()} iconColor="#AAAAAA" onChange={this.handleURLChange} />
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
                profilePictureURL: null,
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
                this.setState({
                    message: "Updated profile picture",
                    type: ToastType.Success
                })
                setTimeout(() => {
                    this.setState({
                        message: ""
                    })
                }, 3000)
            } else {
                if (this.state.profilePicture) {
                    const formData = new FormData();
                    formData.append("avatar", this.state.profilePicture);
                    await Axios.post("api/user/avatar/file", formData, {
                        headers: {
                            "Authorization": `Bearer ${Cookie.getCookie("token")}`,
                            "Content-Type": 'multipart/form-data'
                        }
                    });
                    this.setState({
                        message: "Updated profile picture",
                        type: ToastType.Success
                    })
                    setTimeout(() => {
                        this.setState({
                            message: ""
                        })
                    }, 3000)
                }
            }
        } catch (error) {
            this.setState({
                message: "Failed to update profile picture",
                type: ToastType.Error
            })
            setTimeout(() => {
                this.setState({
                    message: ""
                })
            }, 3000)
        }
    }
}