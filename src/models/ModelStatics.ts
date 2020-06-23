export default class ModelStatics {
    public static getContext<T>(context : any) {
        return (context as unknown as T)
    }
}