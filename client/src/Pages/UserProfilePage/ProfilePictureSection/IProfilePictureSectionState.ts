import ProfilePictureType from "./ProfilePictureType";

export default interface IProfilePictureSectionState {
    inputType: number;
    profilePictureURL : string | undefined;
    profilePicture?: File;
    profilePictureType: ProfilePictureType;
}