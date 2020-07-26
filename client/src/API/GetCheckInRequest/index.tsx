import RequestComponent from "../RequestComponent";
import IGetCheckInRequest from "./IGetCheckInRequest";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class GetCheckInRequest extends RequestComponent<IGetCheckInRequest, ICheckInResponse> {
    getSuccessMessage() {
        return "Loaded check in";
    }

    getFailureMessage() {
        return "Failed to get check in"
    }

    async onLoad() {
        return (await Axios.get(`/api/check_in/${this.props.checkInId}`, {
            headers: {
                "Authorization": `Bearer: ${Cookie.getCookie("token")}`
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

export default connector(GetCheckInRequest);