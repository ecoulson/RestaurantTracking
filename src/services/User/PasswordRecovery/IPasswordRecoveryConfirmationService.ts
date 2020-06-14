export default interface IPasswordRecoveryConfirmationService {
    confirm(email: string, token : string) : Promise<boolean>
}