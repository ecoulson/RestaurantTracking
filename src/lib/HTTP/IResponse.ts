export default interface IResponse<T> {
    send(data : T) : void;
}