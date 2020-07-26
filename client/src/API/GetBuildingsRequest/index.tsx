import RequestComponent from "../RequestComponent";
import IGetBuildingsRequestProps from "./IGetBuildingsRequestProp";
import IGetBuildingResponse from "./IGetBuildingsResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { addToast, removeToast } from "../../Store/Toast/actions";

class GetBuildingsRequest extends RequestComponent<IGetBuildingsRequestProps, IGetBuildingResponse> {
    getSuccessMessage() {
        return `Got ${this.props.organizationId}'s buildings`
    }

    getFailureMessage() {
        return `Failed to get ${this.props.organizationId}'s buildings`
    }

    async onLoad() {
        return (await Axios.get(`/api/organization/buildings/${this.props.organizationId}`, {
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

export default connector(GetBuildingsRequest);