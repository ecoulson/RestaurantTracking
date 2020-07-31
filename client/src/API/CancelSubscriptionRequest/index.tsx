import ICancelSubscriptionRequest from "./ICancelSubscriptionRequest";
import RequestComponent from "../RequestComponent";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";

class CancelSubscriptionRequest extends RequestComponent<ICancelSubscriptionRequest> {
    async onLoad() {
        return (await Axios.post(`/api/payment/cancel-subscription`, {
            subscriptionId: this.props.subscriptionId
        }, {
            headers: {
                Authorization: `Bearer ${Cookie.getCookie("token")}`
            }
        })).data;
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

export default connector(CancelSubscriptionRequest);