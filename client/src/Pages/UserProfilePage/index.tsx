import React from "react";
import BasicLayout from "../../Layouts/BasicLayout";
import ProfilePictureSection from "./ProfilePictureSection";
import UserInfoSection from "./UserInfoSection";
import UserPasswordChangeSection from "./UserPasswordChangeSection";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import { ConnectedProps, connect } from "react-redux";
import IState from "../../Store/IState";

class UserProfilePage extends React.Component<Props> {
    private objectUrl? : string;

    componentWillUnmount() {
        if (this.objectUrl) {
            URL.revokeObjectURL(this.objectUrl)
        }
    }

    async componentDidMount() {
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
                <ProfilePictureSection profilePictureURL={this.props.user.profilePicture} />
                <UserInfoSection 
                    email={this.props.user.email}
                    firstName={this.props.user.firstName}
                    lastName={this.props.user.lastName}
                    username={this.props.user.username}
                    />
                <UserPasswordChangeSection />
            </BasicLayout>
        )
    }
}

const mapState = (state : IState) => {
    return {
        user: state.user
    }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(UserProfilePage)