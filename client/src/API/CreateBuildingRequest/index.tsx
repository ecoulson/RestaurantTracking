import RequestComponent from "../RequestComponent";
import ICreateBuildingRequest from "./ICreateBuildingRequest";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class CreateBuildingRequest extends RequestComponent<ICreateBuildingRequest> {
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