export default interface IPasswordResetService {
    reset(userId: string, newPassword : string) : Promise<void>
}