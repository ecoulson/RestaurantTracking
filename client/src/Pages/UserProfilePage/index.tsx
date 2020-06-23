import React from "react";
import UserProfileLayout from "../../Layouts/UserProfileLayout";
import ProfilePictureSection from "./ProfilePictureSection";
import UserInfoSection from "./UserInfoSection";
import UserPasswordChangeSection from "./UserPasswordChangeSection";

export default class UserProfilePage extends React.Component {
    render() {
        return (
            <UserProfileLayout>
                <ProfilePictureSection profilePictureURL={null} />
                <UserInfoSection />
                <UserPasswordChangeSection />
            </UserProfileLayout>
        )
    }
}