import React from "react";
import NavPanelProfileIcons from "./NavPanelProfileIcons";
import "./index.css";
import NavPanelProfileAvatar from "./NavPanelProfileAvatar";
import NavPanelProfileName from "./NavPanelProfileName";
import NavPanelProfileEmail from "./NavPanelProfileEmail";
import INavProfileState from "./INavProfileState";
import Axios from "axios";
import Cookie from "../../../../lib/Cookie";
import Toast from "../../../../Components/Toast";
import ToastType from "../../../../Components/Toast/ToastType";
import INavPanelProfileProps from "./INavPanelProfileProps";

export default class NavPanelProfile extends React.Component<INavPanelProfileProps, INavProfileState> {
    private objectUrl?: string;

    constructor(props: INavPanelProfileProps) {
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
                    firstName: user.firstName,
                    lastName: user.lastName,
                })
            } else {
                this.setState({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                })
            }
        } catch (error) {
            this.setState({
                message: "Failed to get user profile"
            })
        }
    }

    render() {
        return (
            <div className={`dashboard-profile ${this.getCollapsedClass()}`}>
                <Toast type={ToastType.Error} message={this.state.message} />
                <NavPanelProfileAvatar 
                    collapsed={this.props.collapsed}
                    profilePicture={this.state.profilePicture} />
                <NavPanelProfileName 
                    collapsed={this.props.collapsed} 
                    firstName={this.state.firstName} 
                    lastName={this.state.lastName} />
                <NavPanelProfileEmail 
                    collapsed={this.props.collapsed}
                    email={this.state.email} />
                <NavPanelProfileIcons collapsed={this.props.collapsed} />
            </div>
        )
    }

    private getCollapsedClass() {
        return this.props.collapsed ? "dashboard-profile-collapsed" : ""
    }
}