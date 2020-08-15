export default interface IStorageBroker<U, V> {
    upload(storageInstance: U, params: V) : Promise<string>
}