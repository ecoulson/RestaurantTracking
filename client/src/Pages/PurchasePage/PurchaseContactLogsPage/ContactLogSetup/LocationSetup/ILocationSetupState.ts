import IProductPrice from "../../../../../API/GetProductPricesRequest/IProductPrice";

export default interface ILocationSetupState {
    location: string;
    counts: [IProductPrice, number][]
}