import IDocument from "./IDocument";

export default class ModelMethods {
    public static getContext<T extends IDocument>(context : any) {
        return (context as T)
    }
}