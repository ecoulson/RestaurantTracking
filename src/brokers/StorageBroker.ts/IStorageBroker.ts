import IStorageItem from "./IStorageItem";

export default interface IStorageBroker {
    upload(params : IStorageItem) : Promise<string>
}