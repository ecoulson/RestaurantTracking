import React from "react";
import "./index.css";
import CheckInHeaderTitle from "./CheckInHeaderTitle";
import Logo from "../../../Components/Logo";
import Icon from "../../../Components/Icon";
import IconType from "../../../Components/Icon/IconTypes";
import { ConnectedProps, connect } from "react-redux";
import IState from "../../../Store/IState";
import { toggleCheckInMenuShowAction, toggleCheckInMenuHideAction } from "../../../Store/CheckInMenu/actions";
import ICheckInHeaderState from "./ICheckInHeaderState";
import CheckInBadge from "./CheckInBadge";
import CheckInNotificationMenu from "./CheckInNotificationMenu";
import { isSessionActive } from "../../../API";

class CheckInHeader extends React.Component<Props, ICheckInHeaderState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            hasRendered: false,
            isVisible: false,
            isBadgeVisible: false
        }
        this.onClick = this.onClick.bind(this);
        this.onMenuToggle = this.onMenuToggle.bind(this);
    }

    async componentWillMount() {
        this.setState({
            isBadgeVisible: !(await isSessionActive())
        })
    }

    render() {
        return (
            <header className="check-in-header">
                <div onClick={this.onMenuToggle} className="check-in-header-element" id="check-in-icon-container">
                    <CheckInBadge isVisible={this.state.isBadgeVisible} />
                    <Logo noTitle dark horizontal />
                    <CheckInNotificationMenu isVisible={this.state.isVisible && this.state.isBadgeVisible} />
                </div>
                <div className="check-in-header-element">
                    <CheckInHeaderTitle />
                </div>
                <div className="check-in-header-element">
                    <Icon 
                        className={this.getClassName()} 
                        onClick={this.onClick.bind(this)} 
                        icon={IconType.HamburgerMenu} 
                        width={26} 
                        color="white" 
                        height={26} />
                </div>
            </header>
        )
    }

    onMenuToggle() {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    getClassName() {
        if (this.state.hasRendered) {
            return this.props.hidden ? "check-in-menu-icon-hide" : "check-in-menu-icon-show"
        }
        return ""
    }

    componentDidUpdate() {
        if (this.state.hasRendered || !this.props.hidden) {
            if (!this.state.hasRendered) {
                this.setState({
                    hasRendered: true
                })
            }
        }
    }

    onClick() {
        this.props.hidden ? this.props.show() : this.props.hide()
    }
}

const mapState = (state : IState) => {
    return {
        hidden: state.checkInMenu.hidden
    }
}

const mapDispatch = {
    show: () => toggleCheckInMenuShowAction(),
    hide: () => toggleCheckInMenuHideAction()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(CheckInHeader)