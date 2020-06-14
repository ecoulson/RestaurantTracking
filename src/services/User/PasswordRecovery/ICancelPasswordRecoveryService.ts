export default interface ICancelPasswordRecoveryService {
    cancel(email : string, token : string) : Promise<boolean>;
}