import RequestComponent from "../RequestComponent";
import IRegisterAppRequest from "./IRegisterAppRequest";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class RegisterAppRequest extends RequestComponent<IRegisterAppRequest> {
    getSuccessMessage() {
        return "Successfully registered app"
    }

    getFailureMessage() {
        return "Failed to register app"
    }

    getFetchingMessage() {
        return "Registering app..."
    }

    async onLoad() {
        return (await Axios.post(`/api/app/`, {
            organizationId: this.props.organizationId,
            stripeProductId: this.props.stripeProductId,
            stripeSubscriptionId: this.props.stripeSubscriptionId
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
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

export default connector(RegisterAppRequest);