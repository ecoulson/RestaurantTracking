import IPhoneNumber from "./IPhoneNumber";

export default interface IPhoneInputProps {
    onChange: (phoneNumber : IPhoneNumber) => void;
}