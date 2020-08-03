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
import { Link } from "react-router-dom";

class CheckInHeader extends React.Component<Props, ICheckInHeaderState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            hasRendered: false
        }
    }

    render() {
        return (
            <header className="check-in-header">
                <div className="check-in-header-element">
                    <Link to="/">
                        <Logo noTitle dark horizontal />
                    </Link>
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