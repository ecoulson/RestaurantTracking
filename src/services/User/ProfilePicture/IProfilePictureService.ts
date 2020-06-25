export default interface IProfilePictureService {
    getProfilePicture(userID: string) : Promise<Buffer>
}