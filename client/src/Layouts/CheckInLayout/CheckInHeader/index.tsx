import React from "react";
import "./index.css";
import CheckInHeaderTitle from "./CheckInHeaderTitle";
import Logo from "../../../Components/Logo";
import Icon from "../../../Components/Icon";
import IconType from "../../../Components/Icon/IconTypes";
import { ConnectedProps, connect } from "react-redux";
import IState from "../../../Store/IState";
import { toggleCheckInMenuShowAction } from "../../../Store/CheckInMenu/actions";

class CheckInHeader extends React.Component<Props> {
    render() {
        return (
            <header className="check-in-header">
                <div className="check-in-header-element">
                    <Logo noTitle dark horizontal />
                </div>
                <div className="check-in-header-element">
                    <CheckInHeaderTitle />
                </div>
                <div className="check-in-header-element">
                    <Icon onClick={this.props.show} icon={IconType.HamburgerMenu} width={30} color="white" height={30} />
                </div>
            </header>
        )
    }
}

const mapState = (state : IState) => {
    return {
        hidden: state.checkInMenu.hidden
    }
}

const mapDispatch = {
    show: () => toggleCheckInMenuShowAction()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(CheckInHeader)