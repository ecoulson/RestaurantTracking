import React from "react";
import UserProfileSection from "../UserProfileSection";
import PasswordInput from "../../../Components/PasswordInput";
import Submit from "../../../Components/Submit";
import UserProfileSectionTitle from "../UserProfileSectionTitle";

export default class UserPasswordChangeSection extends React.Component {
    render() {
        return (
            <UserProfileSection>
                <UserProfileSectionTitle>Change Password</UserProfileSectionTitle>
                <PasswordInput iconColor="#AAAAAA" registering onChange={() => {}} />
                <Submit visible={true} onClick={() => {}}>Save</Submit>
            </UserProfileSection>
        )
    }
}