import RequestComponent from "../RequestComponent";
import IUpdatePaymentMethodRequest from "./IUpdatePaymentMethodRequest";
import Axios from "axios";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";
import Cookie from "../../lib/Cookie";

class UpdatePaymentMethodRequest extends RequestComponent<IUpdatePaymentMethodRequest> {
    async onLoad() {
        return (await Axios.post(`/api/payment/update-payment-method`, {
            paymentMethodId: this.props.paymentMethodId,
            customerId: this.props.customerId
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

export default connector(UpdatePaymentMethodRequest);