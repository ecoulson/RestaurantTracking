import IProductPrice from "../../../../../../API/GetProductPricesRequest/IProductPrice";

export default interface IDisplayInputProps {
    productPrices: IProductPrice[];
    onChange: (counts: [IProductPrice, number][]) => void;
}