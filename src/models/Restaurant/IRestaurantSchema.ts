import IDocument from "../IDocument";

export default interface IRestaurantSchema extends IDocument {
    name: string;
    number: string;
    url: string;
}