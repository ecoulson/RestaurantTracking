import React from "react";
import UserProfileSection from "../UserProfileSection";
import UsernameInput from "../../../Components/UsernameInput";
import EmailInput from "../../../Components/EmailInput";
import FullNameInput from "../../../Components/FullNameInput";
import Submit from "../../../Components/Submit";
import UserProfileSectionTitle from "../UserProfileSectionTitle";

export default class UserInfoSection extends React.Component {
    render() {
        return(
            <UserProfileSection>
                <UserProfileSectionTitle>Profile Information</UserProfileSectionTitle>
                <UsernameInput iconColor="#AAAAAA" registering onChange={() => {}} />
                <EmailInput iconColor="#AAAAAA" onChange={() => {}} />
                <FullNameInput iconColor="#AAAAAA" onChange={() => {}} />
                <Submit visible={true} onClick={() => {}}>Save</Submit>
            </UserProfileSection>
        )
    }
}