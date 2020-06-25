import React from "react";
import DashboardProfileIcons from "./DashboardProfileIcons";
import "./index.css";
import DashboardProfileAvatar from "./DashboardProfileAvatar";
import DashboardProfileName from "./DashboardProfileName";
import DashboardProfileEmail from "./DashboardProfileEmail";
import IDashboardProfileState from "../IDashboardProfileState";
import Axios from "axios";
import Cookie from "../../../../lib/Cookie";
import Toast from "../../../../Components/Toast";
import ToastType from "../../../../Components/Toast/ToastType";

export default class DashboardProfile extends React.Component<{}, IDashboardProfileState> {
    private objectUrl?: string;

    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            message: "",
        }
    }

    componentWillUnmount() {
        if (this.objectUrl) {
            URL.revokeObjectURL(this.objectUrl);
        }
    }

    async componentWillMount() {
        try {
            const res = await Axios.get(`/api/user/session`, {
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
                email: res.data.data.email,
                firstName: res.data.data.firstName,
                lastName: res.data.data.lastName,
                profilePicture: this.objectUrl
            });
        } catch (error) {
            this.setState({
                message: "Failed to get user profile"
            })
        }
    }

    render() {
        return (
            <div className="dashboard-profile">
                <Toast type={ToastType.Error} message={this.state.message} />
                <DashboardProfileAvatar profilePicture={this.state.profilePicture} />
                <DashboardProfileName firstName={this.state.firstName} lastName={this.state.lastName} />
                <DashboardProfileEmail email={this.state.email} />
                <DashboardProfileIcons />
            </div>
        )
    }
}