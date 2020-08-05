import RequestComponent from "../RequestComponent";
import IGetOrganizationRequest from "./IGetOrganizationRequest";
import IOrganization from "./IOrganization";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class GetOrganizationRequest extends RequestComponent<IGetOrganizationRequest, IOrganization> {
    async onLoad() {
        return (await Axios.get(`/api/organization/${this.props.organizationId}`, {
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

export default connector(GetOrganizationRequest);