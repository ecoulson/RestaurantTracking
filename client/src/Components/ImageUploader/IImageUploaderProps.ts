export default interface IImageUploaderProps {
    value?: File;
    onImageUpload : (dataUrl : string, image: File) => void;
}