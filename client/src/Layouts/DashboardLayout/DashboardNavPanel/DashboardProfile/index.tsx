import React from "react";
import DashboardProfileIcons from "./DashboardProfileIcons";
import "./index.css";
import DashboardProfileAvatar from "./DashboardProfileAvatar";
import DashboardProfileName from "./DashboardProfileName";
import DashboardProfileEmail from "./DashboardProfileEmail";
import IDashboardProfileState from "../IDashboardProfileState";
import Axios from "axios";
import Cookie from "../../../../lib/Cookie";

export default class DashboardProfile extends React.Component<{}, IDashboardProfileState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: ""
        }
    }

    async componentWillMount() {
        try {
            const res = await Axios.get(`/api/user/session`, {
                headers: {
                    "Authorization": `Bearer ${Cookie.getCookie("token")}`
                }
            });
            this.setState({
                email: res.data.data.email,
                firstName: res.data.data.firstName,
                lastName: res.data.data.lastName
            });
        } catch (error) {
            throw new Error();
        }
    }

    render() {
        return (
            <div className="dashboard-profile">
                <DashboardProfileAvatar />
                <DashboardProfileName firstName={this.state.firstName} lastName={this.state.lastName} />
                <DashboardProfileEmail email={this.state.email} />
                <DashboardProfileIcons />
            </div>
        )
    }
}