import RequestComponent from "../RequestComponent";
import IGetBillingPlanRequest from "./IGetBillingPlanRequest";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";
import Axios from "axios";
import IPrice from "./IPrice";

class GetBillingPlanRequest extends RequestComponent<IGetBillingPlanRequest, IPrice[]> {
    getFailureMessage() {
        return "Failed to get billing plans"
    }

    async onLoad() {
        return (await Axios.get(`/api/billing-plan/${this.props.appType}`)).data
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

export default connector(GetBillingPlanRequest);