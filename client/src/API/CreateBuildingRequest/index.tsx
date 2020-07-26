import RequestComponent from "../RequestComponent";
import ICreateBuildingRequest from "./ICreateBuildingRequest";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { addToast, removeToast } from "../../Store/Toast/actions";

class CreateBuildingRequest extends RequestComponent<ICreateBuildingRequest> {
    getSuccessMessage() {
        return "Successfully created building";
    }

    getFailureMessage() {
        return "Failed to create building";
    }

    async onLoad() {
        return (await Axios.post('/api/building', {
            organizationId: this.props.organizationId,
            buildingName: this.props.buildingName,
            buildingType: this.props.buildingType
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

export default connector(CreateBuildingRequest);