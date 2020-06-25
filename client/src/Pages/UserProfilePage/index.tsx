import React from "react";
import UserProfileLayout from "../../Layouts/UserProfileLayout";
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
            profilePicture: null
        }
    }

    componentWillUnmount() {
        if (this.objectUrl) {
            URL.revokeObjectURL(this.objectUrl)
        }
    }

    async componentWillMount() {
        const res = await Axios.get("/api/user/session", {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        const user = res.data.data;
        const imageBlob = await Axios.get(`/api/user/avatar/${user._id}`, {
            responseType: 'blob',
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        this.objectUrl = URL.createObjectURL(imageBlob.data);
        this.setState({
            profilePicture: this.objectUrl
        })
    }

    render() {
        return (
            <UserProfileLayout>
                <ProfilePictureSection profilePictureURL={this.state.profilePicture} />
                <UserInfoSection />
                <UserPasswordChangeSection />
            </UserProfileLayout>
        )
    }
}