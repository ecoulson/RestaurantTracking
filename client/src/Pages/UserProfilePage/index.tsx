import React from "react";
import BasicLayout from "../../Layouts/BasicLayout";
import ProfilePictureSection from "./ProfilePictureSection";
import UserInfoSection from "./UserInfoSection";
import UserPasswordChangeSection from "./UserPasswordChangeSection";
import IUserProfilePageState from "./IUserProfilePageState";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class UserProfilePage extends React.Component<any, IUserProfilePageState> {
    private objectUrl? : string;

    constructor(props : any) {
        super(props);
        this.state = {
            profilePicture: null,
            email: "",
            username: "",
            firstName: "",
            lastName: "",
        }
    }

    componentWillUnmount() {
        if (this.objectUrl) {
            URL.revokeObjectURL(this.objectUrl)
        }
    }

    async componentDidMount() {
        document.title = "Edit Profile"
        const res = await Axios.get("/api/user/session", {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        const user = res.data.data;
        if (user.profilePicture && user.profilePicture !== "") {
            const imageBlob = await Axios.get(`/api/user/avatar/${user._id}`, {
                responseType: 'blob',
                headers: {
                    "Authorization": `Bearer ${Cookie.getCookie("token")}`
                }
            });
            this.objectUrl = URL.createObjectURL(imageBlob.data);
            this.setState({
                profilePicture: this.objectUrl,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            })
        } else {
            this.setState({
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            })
        }
    }

    render() {
        return (
            <BasicLayout title="Edit Profile">
                <ProfilePictureSection profilePictureURL={this.state.profilePicture} />
                <UserInfoSection 
                    email={this.state.email}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    username={this.state.username}
                    />
                <UserPasswordChangeSection />
            </BasicLayout>
        )
    }
}