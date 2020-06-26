import ProfilePictureType from "./ProfilePictureType";
import ToastType from "../../../Components/Toast/ToastType";

export default interface IProfilePictureSectionState {
    inputType: number;
    profilePictureURL : string | null;
    profilePicture?: File;
    profilePictureType: ProfilePictureType;
    message: string;
    type: ToastType;
}