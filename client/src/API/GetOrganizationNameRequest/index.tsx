import RequestComponent from "../RequestComponent";
import IGetOrganizationNameResponse from "./IGetOrganizationNameResponse";
import IGetOrganizationNameRequestProps from "./IGetOrganizationNameRequestProps";
import Axios from "axios";
import { connect } from "react-redux";
import { addToast, removeToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";

class GetOrganizationNameRequest extends RequestComponent<IGetOrganizationNameRequestProps, IGetOrganizationNameResponse> {
    getFailureMessage() {
        return "Failed to get organization name";
    }

    async onLoad() {
        return (await Axios.get(`/api/organization/${this.props.organizationId}/name`)).data;
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

export default connector(GetOrganizationNameRequest);