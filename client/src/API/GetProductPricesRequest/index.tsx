import RequestComponent from "../RequestComponent";
import IGetProductPricesRequest from "./IGetProductPricesRequest";
import Axios from "axios";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";
import IProductPrice from "./IProductPrice";

class GetProductPricesRequest extends RequestComponent<IGetProductPricesRequest, IProductPrice[]> {
    getFailureMessage() {
        return "Failed to get products"
    }

    async onLoad() {
        return (
            await Axios.get(`/api/product-prices/${this.props.type}`)
        ).data
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

export default connector(GetProductPricesRequest);