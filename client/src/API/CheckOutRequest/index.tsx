import RequestComponent from "../RequestComponent";
import ICheckoutRequestProps from "./ICheckOutRequestProps";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class CheckOutRequest extends RequestComponent<ICheckoutRequestProps, ICheckInResponse> {
    getFailureMessage() {
        return "Failed to checkout"
    }

    getSuccessMessage() {
        return "Successfully checked out"
    }

    async onLoad() {
        return (await Axios.post(`/api/check_in/checkout`, {
            checkInId: this.props.checkInId
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

export default connector(CheckOutRequest);