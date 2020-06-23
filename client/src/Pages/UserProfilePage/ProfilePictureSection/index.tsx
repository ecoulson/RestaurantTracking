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

export default class ProfilePictureSection extends React.Component<IProfilePictureSectionProps, IProfilePictureSectionState> {
    constructor(props : IProfilePictureSectionProps) {
        super(props);
        this.state = {
            profilePictureURL: props.profilePictureURL,
            inputType: ProfilePictureType.Image,
            profilePictureType: ProfilePictureType.Image,
        }
        this.handleInputTypeChange = this.handleInputTypeChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    componentWillReceiveProps(props : IProfilePictureSectionProps) {
        this.setState({
            profilePictureURL: props.profilePictureURL
        })
    }

    render() {
        return (
            <UserProfileSection>
                <UserProfileSectionTitle>Profile Picture</UserProfileSectionTitle>
                {this.getProfilePicture()}
                <SlideSwitch onChange={this.handleInputTypeChange}>
                    <Icon width={25} height={25} icon={IconType.Image} color="black" />
                    <Icon width={25} height={25} icon={IconType.Link} color="black" />
                </SlideSwitch>
                {this.getInput()}
                <Submit visible={true} onClick={() => {}}>Save</Submit>
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
}