import ProfilePictureType from "./ProfilePictureType";

export default interface IProfilePictureSectionState {
    inputType: number;
    profilePictureURL : string | null;
    profilePicture?: File;
    profilePictureType: ProfilePictureType;
}