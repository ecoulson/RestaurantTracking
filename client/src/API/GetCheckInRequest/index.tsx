import RequestComponent from "../RequestComponent";
import IGetCheckInRequest from "./IGetCheckInRequest";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";
import Axios from "axios";

export default class GetCheckInRequest extends RequestComponent<IGetCheckInRequest, ICheckInResponse> {
    async onLoad() {
        return (await Axios.get(`/api`)).data
    }
}