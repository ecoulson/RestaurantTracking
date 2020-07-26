import RequestComponent from "../RequestComponent";
import ICheckInRequestProps from "./ICheckInRequestProps";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import ICheckInResponse from "./ICheckInResponse";
import { connect } from "react-redux";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";

class CheckInRequest extends RequestComponent<ICheckInRequestProps, ICheckInResponse> {
    getSuccessMessage() {
        return "Successfully checked in"
    }

    getFailureMessage() {
        return "Failed to check in"
    }

    async onLoad() {
        return (await Axios.post(`/api/check_in/`, {
            organizationId: this.props.organizationId,
            timeCheckedIn: this.props.timeCheckedIn,
            building: this.props.building
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data
    }
}

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

export default connector(CheckInRequest);