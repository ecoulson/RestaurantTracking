import RequestComponent from "../RequestComponent";
import ISyncCheckInsRequest from "./ISyncCheckInsRequest";
import ISyncCheckInsResponse from "./ISyncCheckInsResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";

class SyncCheckInsRequest extends RequestComponent<ISyncCheckInsRequest, ISyncCheckInsResponse> {
    getFailureMessage() {
        return "Failed to sync check-ins"
    }

    getSuccessMessage() {
        return "Synced check-ins"
    }

    getFetchingMessage() {
        return "Syncing check-ins..."
    }

    async onLoad() {
        return (await Axios.put(`/api/check_in/${this.props.organizationId}/sync`, {
            password: this.props.password,
            username: this.props.username,
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

export default connector(SyncCheckInsRequest);