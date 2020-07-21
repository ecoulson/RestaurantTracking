import IAddress from "./IAddress";

export default interface IAddressInputProps {
    onChange : (address: IAddress) => void;
    iconColor: string;
    hoverColor: string;
}