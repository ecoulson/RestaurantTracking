import IApp from "../../models/App/IApp";

export default interface ICreateUsageRecordsService {
    createUsageRecord(app : IApp) : void;
}