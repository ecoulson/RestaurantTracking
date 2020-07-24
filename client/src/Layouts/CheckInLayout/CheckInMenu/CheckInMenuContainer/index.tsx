import React from "react"
import "./index.css"
import { ConnectedProps, connect } from "react-redux";
import IState from "../../../../Store/IState";
import ICheckInMenuContainerState from "./ICheckInMenuContainerState";

class CheckInMenuContainer extends React.Component<Props, ICheckInMenuContainerState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            hasRendered: false
        }
    }

    render() {
        return (
            <div className={`check-in-menu-container ${this.getShowClass()}`}>
                {this.props.children}
            </div>
        )
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

    getShowClass() {
        if (this.state.hasRendered) {
            return this.props.hidden ?
                "check-in-menu-container-hide" :
                "check-in-menu-container-show"
        }
        return "";
    }
}

const mapState = (state : IState) => {
    return {
        hidden: state.checkInMenu.hidden
    }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    children: any
};

export default connector(CheckInMenuContainer)