import RequestComponent from "../RequestComponent";
import IGetAppRequest from "./IGetAppRequest";
import IApp from "../../lib/IApp";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class GetAppRequest extends RequestComponent<IGetAppRequest, IApp> {
    async onLoad() {
        return (await Axios.get(`/api/app/${this.props.id}`, {
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

export default connector(GetAppRequest);