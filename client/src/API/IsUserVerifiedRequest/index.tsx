import RequestComponent from "../RequestComponent";
import IRequestProps from "../IRequestProps";
import Axios from "axios";
import IIsUserVerifiedRequest from "./IIsUserVerifiedRequest";
import IIsUserVerifiedResponse from "./IIsUserVerifiedResponse";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class IsUserVerifiedRequest extends RequestComponent<IIsUserVerifiedRequest, IIsUserVerifiedResponse> {
    async onLoad() {
        return (await Axios.get('/api/user/verification/verified', {
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

export default connector(IsUserVerifiedRequest);