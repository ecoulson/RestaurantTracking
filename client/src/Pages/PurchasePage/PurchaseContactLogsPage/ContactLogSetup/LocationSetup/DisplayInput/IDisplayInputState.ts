import IProductPrice from "../../../../../../API/GetProductPricesRequest/IProductPrice";

export default interface IDisplayInputState {
    type: number;
    counts: [IProductPrice, number][];
}