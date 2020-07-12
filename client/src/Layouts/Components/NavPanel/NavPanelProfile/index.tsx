import React from "react";
import NavPanelProfileIcons from "./NavPanelProfileIcons";
import "./index.css";
import NavPanelProfileAvatar from "./NavPanelProfileAvatar";
import NavPanelProfileName from "./NavPanelProfileName";
import NavPanelProfileEmail from "./NavPanelProfileEmail";
import INavProfileState from "./INavProfileState";
import Toast from "../../../../Components/Toast";
import ToastType from "../../../../Components/Toast/ToastType";
import { UserActions, IUserState } from "../../../../Store/User/types";
import IState from "../../../../Store/IState";
import { connect, ConnectedProps } from "react-redux";
import { INavPanel } from "../../../../Store/NavPanel/types";
import { getSessionUser, getUserAvatar } from "../../../../API"
import IUser from "../../../../API/IUser";

export class NavPanelProfile extends React.Component<Props, INavProfileState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
        }
    }

    async componentDidMount() {
        if (!this.props.user.hasFetched) {
            try {
                this.props.getUser();
                const user = await getSessionUser();
                if (this.userHasProfilePicture(user)) {
                    const imageBlob = await getUserAvatar(user._id)
                    user.profilePicture = URL.createObjectURL(imageBlob);
                }
                this.props.setUser(user);
            } catch (error) {
                this.setState({
                    message: "Failed to get user profile"
                })
            }
        }
    }

    private userHasProfilePicture(user : IUser) {
        return user.profilePicture && user.profilePicture !== "";
    }

    render() {
        return (
            <div className={`dashboard-profile ${this.getCollapsedClass()}`}>
                <Toast type={ToastType.Error} message={this.state.message} />
                <NavPanelProfileAvatar 
                    collapsed={this.props.navPanel.collapsed}
                    profilePicture={this.props.user.profilePicture} />
                <NavPanelProfileName 
                    collapsed={this.props.navPanel.collapsed} 
                    firstName={this.props.user.firstName} 
                    lastName={this.props.user.lastName} />
                <NavPanelProfileEmail 
                    collapsed={this.props.navPanel.collapsed}
                    email={this.props.user.email} />
                <NavPanelProfileIcons collapsed={this.props.navPanel.collapsed} />
            </div>
        )
    }

    private getCollapsedClass() {
        return this.props.navPanel.collapsed ? "dashboard-profile-collapsed" : ""
    }
}

const mapState = (state : IState) => {
    return {
        user: state.user,
        navPanel: state.navPanel
    }
}

const mapDispatch = {
    getUser: () => ({
        type: UserActions.GET
    }),
    setUser: (user : IUser) => ({
        type: UserActions.SET,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    user: IUserState,
    navPanel: INavPanel
}

export default connector(NavPanelProfile)