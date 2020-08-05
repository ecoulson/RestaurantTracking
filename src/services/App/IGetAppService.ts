import IApp from "../../models/App/IApp";

export default interface IGetAppService {
    getApp(id: string) : Promise<IApp>;
}